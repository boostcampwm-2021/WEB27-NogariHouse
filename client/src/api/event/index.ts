import {
  postCredentialsOption,
} from '@api/util';

export default async (eventInfo: Object) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/event`, postCredentialsOption(eventInfo));

    return response;
  } catch (error) {
    console.error(error);
  }
};
