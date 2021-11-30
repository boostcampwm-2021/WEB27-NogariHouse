import { getCredentialsOption } from '@api/util';

const baseURL = `${process.env.REACT_APP_API_URL}/api/activity`;

const getIsActivityChecked = async () => {
  try {
    const response = await fetch(`${baseURL}/isActivityChecked`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export default getIsActivityChecked;
