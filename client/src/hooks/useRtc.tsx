import {
  MutableRefObject, RefObject, useCallback, useRef, useEffect, useState, Dispatch,
} from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Socket } from 'socket.io-client';

import useSocket from '@src/hooks/useSocket';
import { bindTrailingArgs } from '@src/utils';
import roomDocumentIdState from '@atoms/room-document-id';
import userTypeState, { IUser } from '@atoms/user';
import anonymousState from '@atoms/anonymous';
import roomViewState from '@atoms/room-view-type';
import roomSocketMessage from '@constants/socket-message/room';
import toastListSelector from '@selectors/toast-list';
import toastMessage from '@src/constants/toast-message';

export interface IRTC {
  socketId?: string,
  userDocumentId: string,
  stream?: MediaStream,
  peerConnection?: RTCPeerConnection,
  mic?: boolean,
  isAnonymous?: boolean
}

export const useLocalStream = (): [MutableRefObject<MediaStream | null>, RefObject<HTMLVideoElement | null>, () => Promise<void>] => {
  const myStreamRef = useRef<MediaStream | null>(null);
  const myVideoRef = useRef<HTMLVideoElement | null>(null);

  const getLocalStream = useCallback(async () => {
    myStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    if (myVideoRef.current) myVideoRef.current.srcObject = myStreamRef.current;
      myStreamRef.current!
        .getAudioTracks()
        // eslint-disable-next-line
        .forEach((track: MediaStreamTrack) => (track.enabled = !track.enabled));
  }, []);

  return [myStreamRef, myVideoRef, getLocalStream];
};

export const useSetPeerConnection = <T extends IRTC>(
  setParticipants: Dispatch<React.SetStateAction<Array<T>>>,
  myStreamRef: MutableRefObject<MediaStream | null>,
) => {
  const peerConnectionConfig = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };

  const handleIceEvent = ({ candidate }: RTCPeerConnectionIceEvent, payload: { socketId: string, socket: Socket }) => {
    if (!(payload.socket && candidate)) return;
    payload.socket.emit(roomSocketMessage.ice, candidate, payload.socketId);
  };

  const handleTrackEvent = (data:RTCTrackEvent, payload: { userDocumentId: string, mic: boolean, socketId: string, isAnonymous: boolean }) => {
    setParticipants((oldParticipants: Array<T>) => oldParticipants!
      .filter((participant: T) => (participant.userDocumentId !== payload.userDocumentId))
      .concat({
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

export const useRtc = <T extends IRTC>(): [
  Array<T>,
  Dispatch<React.SetStateAction<T[]>>,
  RefObject<HTMLVideoElement | null>,
  string,
  IUser,
  Socket | undefined,
  MutableRefObject<MediaStream | null>
] => {
  const peerConnectionsRef = useRef<{ [socketId: string]: RTCPeerConnection | null}>({});
  const [participants, setParticipants] = useState<Array<T>>([]);
  const isAnonymous = useRecoilValue(anonymousState);
  const roomDocumentId = useRecoilValue(roomDocumentIdState);
  const [user] = useRecoilState(userTypeState);
  const socket = useSocket('/room');
  const [myStreamRef, myVideoRef, getLocalStream] = useLocalStream();
  const setPeerConnection = useSetPeerConnection(setParticipants, myStreamRef);
  const setRoomView = useSetRecoilState(roomViewState);
  const setToastList = useSetRecoilState(toastListSelector);

  useEffect(() => {
    if (!socket) return;

    const init = async () => {
      try {
        await getLocalStream();
        socket.emit(roomSocketMessage.join, {
          roomDocumentId, userDocumentId: user.userDocumentId, socketId: socket!.id, isAnonymous,
        });
        setToastList(toastMessage.roomEnterSuccess());
      } catch (error) {
        setToastList(toastMessage.roomCreateDanger());
        setRoomView('createRoomView');
      }
    };

    init();

    socket.on(roomSocketMessage.join, async (participantsInfo: Array<T>) => {
      try {
        participantsInfo.forEach(async (participant: T) => {
          if (!myStreamRef.current) return;
          const peerConnection = setPeerConnection(participant, socket);
          if (!(peerConnection && socket)) return;
          peerConnectionsRef.current = { ...peerConnectionsRef.current, [participant.socketId as string]: peerConnection };
          const offer = await peerConnection.createOffer();
          peerConnection.setLocalDescription(offer);

          socket.emit(roomSocketMessage.offer, offer, participant.socketId);
        });
      } catch (error) {
        console.error(error);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on(roomSocketMessage.offer, async (offer: RTCSessionDescriptionInit, userDocumentId: string, socketId: string, isAnonymous: boolean) => {
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
      socket.emit(roomSocketMessage.answer, answer, socketId);
    });

    socket.on(roomSocketMessage.answer, async (answer: RTCSessionDescriptionInit, socketId: string) => {
      const peerConnection = peerConnectionsRef.current[socketId];
      if (!peerConnection) return;
      peerConnection.setRemoteDescription(answer);
    });

    socket.on(roomSocketMessage.ice, async (data: { candidate: RTCIceCandidateInit, candidateSendId: string }) => {
      const peerConnection = peerConnectionsRef.current[data.candidateSendId];
      if (!peerConnection) return;
      await peerConnection.addIceCandidate(data.candidate);
    });

    socket.on(roomSocketMessage.leave, async (socketId: string) => {
      peerConnectionsRef.current[socketId]!.close();
      peerConnectionsRef.current[socketId] = null;
      delete peerConnectionsRef.current[socketId];
      setParticipants((oldParticipants) => oldParticipants?.filter((participant) => participant.socketId !== socketId));
    });

    return () => {
      setParticipants((oldParticipants) => {
        oldParticipants.forEach((participant) => {
          if (!peerConnectionsRef.current[participant.socketId as string]) return;
          peerConnectionsRef.current[participant.userDocumentId]!.close();
          peerConnectionsRef.current[participant.userDocumentId]!.onicecandidate = null;
          peerConnectionsRef.current[participant.userDocumentId]!.ontrack = null;
          peerConnectionsRef.current[participant.userDocumentId] = null;
          delete peerConnectionsRef.current[participant.userDocumentId];
        });
        return [];
      });

      myStreamRef.current?.getTracks()
        .forEach((track: MediaStreamTrack) => {
          track.stop();
        });
    };
  }, [socket, setPeerConnection]);

  return [participants, setParticipants, myVideoRef, roomDocumentId, user, socket, myStreamRef];
};
