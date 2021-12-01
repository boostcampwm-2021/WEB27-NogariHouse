import {
  getCredentialsOption, postCredentialsOption, postOption,
} from '@api/util';
import { IUserDetail } from '@src/interfaces';

export const getUserInfo = async (userDocumentId: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${userDocumentId}?type=documentId`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json: { ok: boolean, userInfo: { profileUrl: string, userName: string, userId: string } } = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const postSignIn = async (loginInfo: Object) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signin`,
      postOption(loginInfo));

    if (!response.ok) return { result: false };

    const json: { accessToken?: string, result: boolean, msg: string } = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

export const postSignUpUserInfo = async (postSignupUserInfoConfig: Object) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup/userInfo`,
      postOption(postSignupUserInfoConfig));

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json: { ok: boolean, msg: string } = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

export const postCheckMail = async (email: { email: string }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup/mail`, postOption(email));

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json: { isUnique: boolean, verificationNumber: string } = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

type TFindUsersById = {
    _id: string;
    userName: string;
    description: string;
    profileUrl: string;
    userId: string;
    type: string;
}

export const findUsersByIdList = async (findUserList: Array<string>) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, postCredentialsOption({ userList: findUserList }));

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json: { ok: boolean, userList: Array<TFindUsersById>} = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getFollowingsList = async (userDocumentId: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/my-followings/${userDocumentId}`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json: { followingList: Array<string> } = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

type TGetMyInfo = {
    ok: boolean,
    accessToken?: string,
    userDocumentId?: string,
    profileUrl?: string,
    userName?: string,
    userId?: string,
}

export const getMyInfo = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json: TGetMyInfo = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

type TChangeProfileImage = { ok: boolean, newProfileUrl: string }

export const changeProfileImage = async (userDocumentId: string, formData: FormData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/profile-image`,
      {
        method: 'post',
        credentials: 'include',
        body: formData,
      },
    );

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json: TChangeProfileImage = await response.json();

    return json;
  } catch (e) {
    console.log(e);
  }
};

export const getUserExistenceByUserId = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}?type=userIdCheck`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json : { ok: boolean } = await response.json();

    return json.ok;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetail = async (profileId: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${profileId}?type=userId`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json: { ok: boolean, userDetailInfo?: IUserDetail } = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
};
