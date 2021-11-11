/* eslint-disable consistent-return */
// eslint-disable-next-line consistent-return
export const getRoomInfo = async (roomDocumentId: string) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/room/${roomDocumentId}`, {
      method: 'get',
      headers: {
        'Content-Typ': 'application/json',
      },
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserInfo = async (userDocumentId: string) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${userDocumentId}`, {
      method: 'get',
      headers: {
        'Content-Typ': 'application/json',
      },
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};
