export const getRoomInfo = async (roomDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/room/${roomDocumentId}`,
      {
        method: 'get',
        credentials: 'include',
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
        credentials: 'include',
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
      credentials: 'include',
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
  credentials: 'include',
});

export const postEvent = async (eventInfo: Object) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/event`, {
      method: 'post',
      credentials: 'include',
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
        credentials: 'include',
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

export const findUsersByIdList = async (findUserList: Array<string>) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
      method: 'post',
      credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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
      credentials: 'include',
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
        credentials: 'include',
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

export const setUnCheckedMsg0 = async (chatDocumentId: string, userDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/chat-rooms/setUnCheckedMsg/${chatDocumentId}/${userDocumentId}`,
      {
        method: 'get',
        credentials: 'include',
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

export const changeProfileImage = async (userDocumentId: string, formData: FormData) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/profile-image`,
      {
        method: 'post',
        credentials: 'include',
        body: formData,
      },
    );
    response = await response.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getRandomRoomDocumentId = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/room/public/random`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getIsActivityChecked = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/isActivityChecked`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getUnReadMsgCount = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat-rooms/unReadMsgCount`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getUserExistenceByUserId = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}?type=userId`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    return true;
  } catch (error) {
    console.error(error);
  }
};
