type TRoomSocketMessage = {
    join: string,
    offer: string,
    answer: string,
    ice: string,
    mic: string,
    leave: string
}

export default {
  join: 'room:join',
  offer: 'room:offer',
  answer: 'room:answer',
  ice: 'room:ice',
  mic: 'room:mic',
  leave: 'room:leave',
} as TRoomSocketMessage;
