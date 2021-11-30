import { getCredentialsOption } from '@api/util';

type TSearchResult = {
  ok: boolean,
  items?: any[],
  keyword?: string,
}

export default async (searchInfo: {keyword:string, option:string}) => {
  const { keyword, option } = searchInfo;
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search/${option}?keyword=${keyword}&count=0`, getCredentialsOption());

    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

    const json: TSearchResult = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
