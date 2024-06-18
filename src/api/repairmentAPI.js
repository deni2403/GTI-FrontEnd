import authorizedApiClient from './axios-instance';
import { downloadBlob } from '../utils/Utility';

export const getAllRepairments = async (page, searchQuery = '') => {
  const response = await authorizedApiClient.get(`/repairs`, {
    params: { page, search: searchQuery },
  });
  return response.data;
};

export const getRepairment = async (id) => {
  const response = await authorizedApiClient.get(`/repairs/${id}`);
  return response.data;
};

export const addRepairment = async (repairData) => {
  try {
    const response = await authorizedApiClient.post('/repairs', repairData);
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};

export const updateRepairment = async (id, repairData) => {
  try {
    const response = await authorizedApiClient.put(
      `/repairs/${id}`,
      repairData,
    );
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};

export const deleteRepairment = async (id) => {
  try {
    const response = await authorizedApiClient.delete(`/repairs/${id}`);
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};

export const finishRepairment = async (id) => {
  try {
    const response = await authorizedApiClient.put(`/repairs/${id}/finish`);
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    const { response } = error;
    return { error, data: response.data.message };
  }
};

export const getRepairHistory = async (id) => {
  const response = await authorizedApiClient.get(`/repairs/${id}/history`);
  return response.data;
};

export const exportRepairmentsData = async () => {
  try {
    const response = await authorizedApiClient.get('repairs', {
      params: { export: true },
      responseType: 'blob',
    });
    downloadBlob(response.data, 'repairs.xlsx');
    return { error: false, data: 'Succesfully Export Data !' };
  } catch (error) {
    return { error, data: 'Failed to Export Data.' };
  }
};
