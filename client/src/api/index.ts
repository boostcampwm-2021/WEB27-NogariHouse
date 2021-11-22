/* eslint-disable max-len */
/* eslint-disable consistent-return */
// eslint-disable-next-line consistent-return
export const getRoomInfo = async (roomDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/room/${roomDocumentId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserInfo = async (userDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/${userDocumentId}?type=documentId`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response as unknown as {
      ok: boolean,
      userInfo: { profileUrl: string, userName: string, userId: string }
     };
  } catch (error) {
    console.error(error);
  }
};

export const postRoomInfo = async (roomInfo: Object) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/room`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomInfo),
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRoom = (roomDocumentId: string) => fetch(`${process.env.REACT_APP_API_URL}/api/room/${roomDocumentId}`, {
  method: 'DELETE',
});

export const postEvent = async (eventInfo: Object) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/event`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventInfo),
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postSignIn = async (loginInfo: Object) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),

    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postSignUpUserInfo = async (postSignupUserInfoConfig: Object) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup/userInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postSignupUserInfoConfig),
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postCheckMail = async (email: { email: string }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup/mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json = await response.json();
    return json as { isUnique: boolean, verificationNumber: string };
  } catch (error) {
    console.error(error);
  }
};

export const getSearchResult = async (searchInfo: {keyword:string, option:string}) => {
  const { keyword, option } = searchInfo;
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/search/${option}?keyword=${keyword}&count=0`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const findUsersById = async (findUserList: Array<string>) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userList: findUserList }),
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getChatRooms = async (userDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/chat-rooms/${userDocumentId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getFollowingsList = async (userDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/my-followings/${userDocumentId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postChatRoom = async (participants: Array<string>) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat-rooms`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ participants }),
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getMyInfo = async () => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getChattingLog = async (chatDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/chat-rooms/chat-log/${chatDocumentId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    response = await response.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

interface IChattingLog {
  userDocumentId: string,
  message: string,
  date: Date,
}

export const postChattingMsg = async (chattingLog: IChattingLog, chatDocumentId: string, userDocumentId: string) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat-rooms/chat-log`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chattingLog, chatDocumentId, userDocumentId }),
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const setUnCheckedMsg0 = async (chatDocumentId: string, userDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/chat-rooms/setUnCheckedMsg/${chatDocumentId}/${userDocumentId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    response = await response.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const changeProfileImage = async (userDocumentId: string, imageData: FormData) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/profile-image`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify({ imageData, userDocumentId }),
      },
    );
    response = await response.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};
