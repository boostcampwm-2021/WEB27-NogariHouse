type TChatSocketMessage = {
  viewJoin: string,
  roomJoin: string,
  makeChat: string,
  inviteRoom: string,
  leave: string,
  sendMsg: string,
  updateCount: string,
}

export default {
  viewJoin: 'chat:viewJoin',
  roomJoin: 'chat:roomJoin',
  makeChat: 'chat:makeChat',
  inviteRoom: 'chat:inviteRoom',
  leave: 'chat:leave',
  sendMsg: 'chat:sendMsg',
  updateCount: 'chat:updateCount',
} as TChatSocketMessage;
