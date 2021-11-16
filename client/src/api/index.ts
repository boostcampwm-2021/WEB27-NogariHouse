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
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserInfo = async (userDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/${userDocumentId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    response = await response.json();
    return response;
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

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

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

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postCheckMail = async (email: Object) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup/mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });

    response = await response.json();
    return response;
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
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getFollowingsList = async (userDocumentId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/followings/${userDocumentId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};
