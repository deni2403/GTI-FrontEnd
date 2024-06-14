import authorizedApiClient from './axios-instance';

export const getLogs = async (page, searchQuery = '') => {
  const response = await authorizedApiClient.get('/logs', {
    params: { page, search: searchQuery },
  });
  return response.data;
};
