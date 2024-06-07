import authorizedApiClient from './axios-instance';

export const getAllShipments = async (page) => {
  const response = await authorizedApiClient.get(`/shipments?page=${page}`);
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
    return { error: false, data: 'Add Shipment Succesfull' };
  } catch (error) {
    return { error, data: null };
  }
};

export const getShipmentsTotal = async () => {
  const response = await authorizedApiClient.get('/shipments/dashboard');
  return response.data;
};
