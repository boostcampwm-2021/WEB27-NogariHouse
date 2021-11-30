type TChatSocketMessage = {
  emit: {
    viewJoin: string,
    roomJoin: string,
    makeChat: string,
    inviteRoom: string,
    leave: string,
  },
  on: {
    sendMsg: string,
    updateCount: string,
  }
}

export default {
  emit: {
    viewJoin: 'chat:viewJoin',
    roomJoin: 'chat:roomJoin',
    makeChat: 'chat:makeChat',
    inviteRoom: 'chat:inviteRoom',
    leave: 'chat:leave',
  },
  on: {
    sendMsg: 'chat:sendMsg',
    updateCount: 'chat:updateCount',
  },
} as TChatSocketMessage;
