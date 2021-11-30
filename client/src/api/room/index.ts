import { getCredentialsOption, postCredentialsOption } from '@api/util';

const baseURL = `${process.env.REACT_APP_API_URL}/api/room`;

export const getRoomInfo = async (roomDocumentId: string) => {
  try {
    let response = await fetch(`${baseURL}/${roomDocumentId}`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postRoomInfo = async (roomInfo: Object) => {
  try {
    let response = await fetch(baseURL, postCredentialsOption(roomInfo));

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRoom = (roomDocumentId: string) => fetch(`${baseURL}/${roomDocumentId}`, {
  method: 'DELETE',
  credentials: 'include',
});

export const getRandomRoomDocumentId = async () => {
  try {
    const response = await fetch(`${baseURL}/public/random`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
