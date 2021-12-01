type TChatSocketMessage = {
  viewJoin: string,
  roomJoin: string,
  makeChat: string,
  inviteRoom: string,
  leave: string,
  sendMsg: string,
  alertMsg: string,
  updateCount: string,
}

export default {
  viewJoin: 'chat:viewJoin',
  roomJoin: 'chat:roomJoin',
  makeChat: 'chat:makeChat',
  inviteRoom: 'chat:inviteRoom',
  leave: 'chat:leave',
  sendMsg: 'chat:sendMsg',
  alertMsg: 'chat:alertMsg',
  updateCount: 'chat:updateCount',
} as TChatSocketMessage;
