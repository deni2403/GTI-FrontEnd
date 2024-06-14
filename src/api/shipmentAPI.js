import authorizedApiClient from './axios-instance';
import { downloadBlob } from '../utils/Utility';

export const getAllShipments = async (
  page,
  searchQuery = '',
  startDate = '',
  endDate = '',
) => {
  const response = await authorizedApiClient.get('/shipments', {
    params: { page, search: searchQuery, startDate, endDate },
  });
  return response.data;
};

export const getShipment = async (id) => {
  const response = await authorizedApiClient.get(`/shipments/${id}`);
  return response.data;
};

export const addShipment = async (containerData) => {
  try {
    const response = await authorizedApiClient.post('/shipments', {
      ...containerData,
    });
    const message = response.data.message;
    return { error: false, data: message };
  } catch (error) {
    return { error, data: 'Failed Add Shipment' };
  }
};

export const updateShipment = async (id, shipmentData) => {
  try {
    const response = await authorizedApiClient.put(`/shipments/${id}`, {
      ...shipmentData,
    });

    return { error: false, data: 'Shipment Updated Succesfully' };
  } catch (error) {
    return { error, data: 'Update shipment Failed.' };
  }
};

export const deleteShipment = async (id) => {
  try {
    const response = await authorizedApiClient.delete(`/shipments/${id}`);
    return { error: false, data: response.data.message };
  } catch (error) {
    return { error, data: 'Failed to Delete Shipment.' };
  }
};

export const getShipmentsTotal = async () => {
  const response = await authorizedApiClient.get('/shipments/dashboard');
  return response.data;
};

export const exportShipmentData = async (startDate, endDate) => {
  try {
    const response = await authorizedApiClient.get('shipments', {
      params: { export: true, startDate, endDate },
      responseType: 'blob',
    });
    downloadBlob(response.data, 'shipments.xlsx');
    return { error: false, data: 'Succesfully Export Data !' };
  } catch (error) {
    return { error, data: 'Failed to Export Data.' };
  }
};
