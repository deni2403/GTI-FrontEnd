import authorizedApiClient from './axios-instance';
import { downloadBlob } from '../utils/Utility';

export const getAllContainers = async (
  page,
  searchQuery = '',
  status = '',
  location = '',
) => {
  const response = await authorizedApiClient.get(`/containers`, {
    params: {
      page,
      search: searchQuery,
      status,
      location,
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
    const data = response.data.container.number;
    return { error: false, data: `Container ${data} Succesfully Added` };
  } catch (error) {
    return { error, data: 'Failed Add Container.' };
  }
};

export const updateContainer = async (id, containerData) => {
  try {
    const response = await authorizedApiClient.put(`/containers/${id}`, {
      ...containerData,
    });
    const data = response.data.container.number;
    return { error: false, data: `Container ${data} Succesfully Updated` };
  } catch (error) {
    return { error, data: null };
  }
};

export const deleteContainer = async (id) => {
  try {
    await authorizedApiClient.delete(`/containers/${id}`);
    return { error: false, data: 'Container Succesfully Deleted' };
  } catch (error) {
    return { error, data: null };
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
