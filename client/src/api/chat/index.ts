import { getCredentialsOption, postCredentialsOption } from '@api/util';

const baseUrl = `${process.env.REACT_APP_API_URL}/api/chat-rooms`;

export const getChatRooms = async (userDocumentId: string) => {
  try {
    let response = await fetch(`${baseUrl}/${userDocumentId}`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postChatRoom = async (participants: Array<string>) => {
  try {
    let response = await fetch(`${baseUrl}`, postCredentialsOption({ participants }));

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getChattingLog = async (chatDocumentId: string, count: number) => {
  try {
    let response = await fetch(`${baseUrl}/chat-log/${chatDocumentId}?count=${count}`, getCredentialsOption());
    response = await response.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const setUnCheckedMsg0 = async (chatDocumentId: string, userDocumentId: string) => {
  try {
    let response = await fetch(`${baseUrl}/setUnCheckedMsg/${chatDocumentId}/${userDocumentId}`, getCredentialsOption());
    response = await response.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getUnReadMsgCount = async () => {
  try {
    const response = await fetch(`${baseUrl}/unReadMsgCount`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
