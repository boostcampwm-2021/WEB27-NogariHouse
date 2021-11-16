/* eslint-disable max-len */
import {
  MutableRefObject, RefObject, useCallback, useRef, useEffect, useState, Dispatch,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import useSocket from '@src/hooks/useSocket';
import { bindTrailingArgs } from '@src/utils';
import roomDocumentIdState from '@atoms/room-document-id';
import userTypeState, { IUser } from '@atoms/user';
import { Socket } from 'socket.io-client';

export type TParticipant = {
    userDocumentId: string,
    mic: boolean,
    stream?: MediaStream,
    peerConnection?: RTCPeerConnection,
    socketId: string,
  }

export const useLocalStream = (): [MutableRefObject<MediaStream | null>, RefObject<HTMLVideoElement | null>, () => Promise<void>] => {
  const myStream = useRef<MediaStream | null>(null);
  const myVideo = useRef<HTMLVideoElement | null>(null);

  const getLocalStream = useCallback(async () => {
    try {
      myStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      if (myVideo.current) myVideo.current.srcObject = myStream.current;
    } catch (e) {
      console.error(e);
    }
  }, []);

  return [myStream, myVideo, getLocalStream];
};

export const useSetPeerConnection = (setParticipants: Dispatch<React.SetStateAction<Array<TParticipant>>>, myStream: MutableRefObject<MediaStream | null>) => {
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

  const handleTrackEvent = (data:RTCTrackEvent, payload: { userDocumentId: string, mic: boolean, socketId: string }) => {
    setParticipants((oldParticipants: Array<TParticipant>) => oldParticipants!.filter((participant: TParticipant) => (participant.userDocumentId !== payload.userDocumentId)).concat({
      stream: data.streams[0],
      userDocumentId: payload.userDocumentId,
      mic: payload.mic,
      socketId: payload.socketId,
    }));
  };

  const setPeerConnection = useCallback((userDocumentId:string, socketId: string, mic: boolean, socket: Socket) => {
    try {
      const peerConnection = new RTCPeerConnection(peerConnectionConfig);

      const handleIce = bindTrailingArgs(handleIceEvent, { socketId, socket });
      const handleTrack = bindTrailingArgs(handleTrackEvent, {
        userDocumentId, mic, socketId, socket,
      });

      peerConnection.addEventListener('icecandidate', handleIce);
      peerConnection.addEventListener('track', handleTrack);

      myStream.current!.getTracks().forEach((track: MediaStreamTrack) => {
        if (!myStream.current) return;
        peerConnection.addTrack(track, myStream.current);
      });

      return peerConnection;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, []);

  return setPeerConnection;
};

export const useRtc = (): [TParticipant[], RefObject<HTMLVideoElement | null>, string, IUser, Socket | undefined] => {
  const peerConnections = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const [participants, setParticipants] = useState<Array<TParticipant>>([]);
  const roomDocumentId = useRecoilValue(roomDocumentIdState);
  const [user] = useRecoilState(userTypeState);
  const socket = useSocket();
  const [myStream, myVideo, getLocalStream] = useLocalStream();
  const setPeerConnection = useSetPeerConnection(setParticipants, myStream);
  useEffect(() => {
    if (!socket) return;

    const init = async () => {
      await getLocalStream();
      socket.emit('room:join', {
        roomDocumentId, userDocumentId: user.userDocumentId, socketId: socket!.id,
      });
    };

    init();

    socket.on('room:join', async (participantsInfo: Array<TParticipant>) => {
      participantsInfo.forEach(async (participant: TParticipant) => {
        if (!myStream.current) return;
        const peerConnection = setPeerConnection(participant.userDocumentId, participant.socketId, participant.mic, socket);
        if (!(peerConnection && socket)) return;
        peerConnections.current = { ...peerConnections.current, [participant.socketId]: peerConnection };
        const offer = await peerConnection.createOffer();
        peerConnection.setLocalDescription(offer);

        socket.emit('room:offer', offer, participant.socketId);
      });
    });

    socket.on('room:offer', async (offer: RTCSessionDescriptionInit, userDocumentId: string, socketId: string) => {
      if (!myStream.current) return;
      const peerConnection = setPeerConnection(userDocumentId, socketId, true, socket);
      if (!(peerConnection && socket)) return;
      peerConnections.current = { ...peerConnections.current, [socketId]: peerConnection };
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('room:answer', answer, socketId);
    });

    socket.on('room:answer', async (answer: RTCSessionDescriptionInit, socketId: string) => {
      const peerConnection = peerConnections.current[socketId];
      if (!peerConnection) return;
      peerConnection.setRemoteDescription(answer);
    });

    socket.on('room:ice', async (data: { candidate: RTCIceCandidateInit, candidateSendId: string }) => {
      const peerConnection = peerConnections.current[data.candidateSendId];
      if (!peerConnection) return;
      await peerConnection.addIceCandidate(data.candidate);
    });

    socket.on('room:leave', async (socketId: string) => {
      peerConnections.current[socketId].close();
      delete peerConnections.current[socketId];
      setParticipants((oldParticipants) => oldParticipants?.filter((participant) => participant.socketId !== socketId));
    });

    // eslint-disable-next-line consistent-return
    return () => {
      participants.forEach((participant) => {
        if (!peerConnections.current[participant.userDocumentId]) return;
        peerConnections.current[participant.userDocumentId].close();
        delete peerConnections.current[participant.userDocumentId];
      });

          myStream.current!.getTracks()
            .forEach((track: MediaStreamTrack) => {
              track.stop();
            });
    };
  }, [socket, setPeerConnection]);

  return [participants, myVideo, roomDocumentId, user, socket];
};
