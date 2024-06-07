import authorizedApiClient from './axios-instance';

export const login = async (email, password) => {
  const response = await authorizedApiClient.post('/login', {
    email,
    password,
  });
  return response.data;
};

export const getMe = async () => {
  const response = await authorizedApiClient.get('/getMe');
  return response.data;
}
