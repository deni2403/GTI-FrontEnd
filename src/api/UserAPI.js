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
    return { error: false, data: response.data.message };
  } catch (error) {
    return { error, data: null };
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await authorizedApiClient.put(`/users/${id}`, formData);
    return { error: false, data: response.data.message };
  } catch (error) {
    return { error, data: null };
  }
};

export const deleteUser = async (id) => {
  try {
    await authorizedApiClient.delete(`/users/${id}`);
    return { error: false, data: 'User Deleted Succesfully !' };
  } catch (error) {
    return { error, data: null };
  }
};
