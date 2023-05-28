export interface Request {
  url: string;
  method: string;
  body?: any;
  json?: boolean;
}

// export interface UserResponse {
//   user: User;
//   token: string;
// }

const fetcher = async ({ url, method, body, json = true }: Request) => {
  const res = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  if (!res.ok) {
    throw new Error('API Error');
  }

  if (json) {
    const data = await res.json();
    console.log('data!!!!', data);
    return data;
  }
};

export const register = async (user) => {
  return fetcher({
    url: 'http://localhost:3000/api/register',
    method: 'POST',
    body: user,
    json: true,
  });
};

export const signin = async (user) => {
  return fetcher({
    url: 'http://localhost:3000/api/signin',
    method: 'POST',
    body: user,
    json: true,
  });
};

export const createNewProject = (name) => {
  return fetcher({
    url: '/api/project',
    method: 'POST',
    body: { name },
  });
};
