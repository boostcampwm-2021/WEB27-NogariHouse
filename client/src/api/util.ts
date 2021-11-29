export const getCredentialsOption = (): RequestInit => (
  {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getOption = (): RequestInit => (
  {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const postCredentialsOption = (body: any): RequestInit => (
  {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export const postOption = (body: any): RequestInit => (
  {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
