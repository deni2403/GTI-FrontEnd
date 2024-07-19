import authorizedApiClient from './axios-instance';

export const getLogs = async (page, keyword = '') => {
  const response = await authorizedApiClient.get('/logs', {
    params: { page, search: keyword },
  });
  return response.data;
};
