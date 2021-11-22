/* eslint-disable max-len */
import {
  MutableRefObject, RefObject, useCallback, useRef, useEffect, useState, Dispatch,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Socket } from 'socket.io-client';

import useSocket from '@src/hooks/useSocket';
import { bindTrailingArgs } from '@src/utils';
import roomDocumentIdState from '@atoms/room-document-id';
import userTypeState, { IUser } from '@atoms/user';
import anonymousState from '@atoms/anonymous';

export interface IRTC {
  socketId?: string,
  userDocumentId: string,
  stream?: MediaStream,
  peerConnection?: RTCPeerConnection,
  mic?: boolean,
  isAnonymous?: boolean
}

export interface IParticipant extends IRTC {
    mic?: boolean,
  }

export const useLocalStream = (): [MutableRefObject<MediaStream | null>, RefObject<HTMLVideoElement | null>, () => Promise<void>] => {
  const myStreamRef = useRef<MediaStream | null>(null);
  const myVideoRef = useRef<HTMLVideoElement | null>(null);

  const getLocalStream = useCallback(async () => {
    try {
      myStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      if (myVideoRef.current) myVideoRef.current.srcObject = myStreamRef.current;
      myStreamRef.current!
        .getAudioTracks()
        // eslint-disable-next-line
        .forEach((track: MediaStreamTrack) => (track.enabled = !track.enabled));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return [myStreamRef, myVideoRef, getLocalStream];
};

export const useSetPeerConnection = <T extends IRTC>(setParticipants: Dispatch<React.SetStateAction<Array<T>>>, myStreamRef: MutableRefObject<MediaStream | null>) => {
  const peerConnectionConfig = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };

  const handleIceEvent = ({ candidate }: RTCPeerConnectionIceEvent, payload: { socketId: string, socket: Socket }) => {
    if (!(payload.socket && candidate)) return;
    payload.socket.emit('room:ice', candidate, payload.socketId);
  };

  const handleTrackEvent = (data:RTCTrackEvent, payload: { userDocumentId: string, mic: boolean, socketId: string, isAnonymous: boolean }) => {
    setParticipants((oldParticipants: Array<T>) => oldParticipants!.filter((participant: T) => (participant.userDocumentId !== payload.userDocumentId)).concat({
      stream: data.streams[0],
      userDocumentId: payload.userDocumentId,
      mic: payload.mic,
      socketId: payload.socketId,
      isAnonymous: payload.isAnonymous,
    } as unknown as T));
  };

  const setPeerConnection = useCallback((participant: T, socket: Socket) => {
    try {
      const peerConnection = new RTCPeerConnection(peerConnectionConfig);

      const handleIce = bindTrailingArgs(handleIceEvent, { socketId: participant.socketId, socket });
      const handleTrack = bindTrailingArgs(handleTrackEvent, {
        userDocumentId: participant.userDocumentId,
        mic: participant.mic as unknown,
        socketId: participant.socketId,
        isAnonymous: participant.isAnonymous,
        socket,
      });

      peerConnection.addEventListener('icecandidate', handleIce);
      peerConnection.addEventListener('track', handleTrack);

      myStreamRef.current!.getTracks().forEach((track: MediaStreamTrack) => {
        if (!myStreamRef.current) return;
        peerConnection.addTrack(track, myStreamRef.current);
      });

      return peerConnection;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, []);

  return setPeerConnection;
};

export const useRtc = <T extends IRTC>(): [Array<T>, Dispatch<React.SetStateAction<T[]>>, RefObject<HTMLVideoElement | null>, string, IUser, Socket | undefined, MutableRefObject<MediaStream | null>] => {
  const peerConnectionsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const [participants, setParticipants] = useState<Array<T>>([]);
  const isAnonymous = useRecoilValue(anonymousState);
  const roomDocumentId = useRecoilValue(roomDocumentIdState);
  const [user] = useRecoilState(userTypeState);
  const socket = useSocket();
  const [myStreamRef, myVideoRef, getLocalStream] = useLocalStream();
  const setPeerConnection = useSetPeerConnection(setParticipants, myStreamRef);
  useEffect(() => {
    if (!socket) return;

    const init = async () => {
      await getLocalStream();
      socket.emit('room:join', {
        roomDocumentId, userDocumentId: user.userDocumentId, socketId: socket!.id, isAnonymous,
      });
    };

    init();

    socket.on('room:join', async (participantsInfo: Array<T>) => {
      participantsInfo.forEach(async (participant: T) => {
        if (!myStreamRef.current) return;
        const peerConnection = setPeerConnection(participant, socket);
        if (!(peerConnection && socket)) return;
        peerConnectionsRef.current = { ...peerConnectionsRef.current, [participant.socketId as string]: peerConnection };
        const offer = await peerConnection.createOffer();
        peerConnection.setLocalDescription(offer);

        socket.emit('room:offer', offer, participant.socketId);
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('room:offer', async (offer: RTCSessionDescriptionInit, userDocumentId: string, socketId: string, isAnonymous: boolean) => {
      if (!myStreamRef.current) return;
      const participant: any = {
        userDocumentId, socketId, isAnonymous, mic: false,
      };
      const peerConnection = setPeerConnection(participant, socket);
      if (!(peerConnection && socket)) return;
      peerConnectionsRef.current = { ...peerConnectionsRef.current, [socketId]: peerConnection };
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('room:answer', answer, socketId);
    });

    socket.on('room:answer', async (answer: RTCSessionDescriptionInit, socketId: string) => {
      const peerConnection = peerConnectionsRef.current[socketId];
      if (!peerConnection) return;
      peerConnection.setRemoteDescription(answer);
    });

    socket.on('room:ice', async (data: { candidate: RTCIceCandidateInit, candidateSendId: string }) => {
      const peerConnection = peerConnectionsRef.current[data.candidateSendId];
      if (!peerConnection) return;
      await peerConnection.addIceCandidate(data.candidate);
    });

    socket.on('room:leave', async (socketId: string) => {
      peerConnectionsRef.current[socketId].close();
      delete peerConnectionsRef.current[socketId];
      setParticipants((oldParticipants) => oldParticipants?.filter((participant) => participant.socketId !== socketId));
    });

    // eslint-disable-next-line consistent-return
    return () => {
      participants.forEach((participant) => {
        if (!peerConnectionsRef.current[participant.userDocumentId]) return;
        peerConnectionsRef.current[participant.userDocumentId].close();
        delete peerConnectionsRef.current[participant.userDocumentId];
      });

          myStreamRef.current!.getTracks()
            .forEach((track: MediaStreamTrack) => {
              track.stop();
            });
    };
  }, [socket, setPeerConnection]);

  return [participants, setParticipants, myVideoRef, roomDocumentId, user, socket, myStreamRef];
};
