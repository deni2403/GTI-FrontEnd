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
    return { error: false, data: 'Repairment Added Successfully' };
  } catch (error) {
    return { error, data: 'Failed to Add Repairment' };
  }
};

export const updateRepairment = async (id, repairData) => {
  try {
    const response = await authorizedApiClient.put(
      `/repairs/${id}`,
      repairData,
    );
    return { error: false, data: 'Repairment Updated Successfully' };
  } catch (error) {
    return { error, data: 'Failed to Update Repairment' };
  }
};

export const deleteRepairment = async (id) => {
  try {
    const response = await authorizedApiClient.delete(`/repairs/${id}`);
    return { error: false, data: 'Repairment Deleted Successfully' };
  } catch (error) {
    return { error, data: 'Failed to Delete Repairment' };
  }
};

export const finishRepairment = async (id) => {
  try {
    const response = await authorizedApiClient.put(`/repairs/${id}/finish`);
    return { error: false, data: 'Repairment Finished Successfully' };
  } catch (error) {
    return { error, data: 'Failed to Finish Repairment' };
  }
};

export const getRepairHistory = async (id) => {
  const response = await authorizedApiClient.get(`/repairs/${id}/history`);
  return response.data;
}

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
