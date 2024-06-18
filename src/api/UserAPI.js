import authorizedApiClient from './axios-instance';

export const getAllUsers = async (page) => {
  const response = await authorizedApiClient.get(`/users?page=${page}`);
  return response.data;
};

export const getUser = async (id) => {
  const response = await authorizedApiClient.get(`/users/${id}`);
  return response.data;
};

export const addUser = async (formData) => {
  try {
    const response = await authorizedApiClient.post('/users', formData);
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await authorizedApiClient.put(`/users/${id}`, formData);
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await authorizedApiClient.delete(`/users/${id}`);
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};
