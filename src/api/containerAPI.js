import authorizedApiClient from './axios-instance';
import { downloadBlob } from '../utils/Utility';

export const getAllContainers = async (
  page,
  searchQuery = '',
  status = '',
  location = '',
  type = '',
) => {
  const response = await authorizedApiClient.get(`/containers`, {
    params: {
      page,
      search: searchQuery,
      status,
      location,
      type,
    },
  });
  return response.data;
};

export const getContainer = async (id) => {
  const response = await authorizedApiClient.get(`/containers/${id}`);
  return response.data;
};

export const addContainer = async (containerData) => {
  try {
    const response = await authorizedApiClient.post('/containers', {
      ...containerData,
    });
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};

export const updateContainer = async (id, containerData) => {
  try {
    const response = await authorizedApiClient.put(`/containers/${id}`, {
      ...containerData,
    });
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};

export const deleteContainer = async (id) => {
  try {
    const response = await authorizedApiClient.delete(`/containers/${id}`);
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};

export const getContainersReady = async () => {
  const response = await authorizedApiClient.get('/containers/ready');
  return response.data;
};

export const getContainersTotal = async () => {
  const response = await authorizedApiClient.get('/containers/dashboard');
  return response.data;
};

export const getContainerHistory = async (id) => {
  const response = await authorizedApiClient.get(`/containers/${id}/history`);
  return response.data;
};

export const getContainerLocation = async () => {
  const response = await authorizedApiClient.get('/containers/location');
  return response.data;
};

export const exportContainerData = async (status = '', location = '') => {
  try {
    const response = await authorizedApiClient.get('containers', {
      params: { export: true, status, location },
      responseType: 'blob',
    });
    downloadBlob(response.data, 'containers.xlsx');
    return { error: false, data: 'Succesfully Export Data !' };
  } catch (error) {
    return { error, data: 'Failed to Export Data.' };
  }
};
