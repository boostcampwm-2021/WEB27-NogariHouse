type TUserSocketMessage = {
  join: string,
  getActivity: string,
  firstFollowingList: string,
  newActiveUser: string,
  newLeaveUser: string,
  hands: string,
}

export default {
  join: 'user:join',
  getActivity: 'user:getActivity',
  firstFollowingList: 'user:firstFollowingList',
  newActiveUser: 'user:newActiveUser',
  newLeaveUser: 'user:newLeaveUser',
  hands: 'user:hands',
} as TUserSocketMessage;
