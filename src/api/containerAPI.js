import authorizedApiClient from './axios-instance';

export const getAllContainers = async (page) => {
  const response = await authorizedApiClient.get(`/containers?page=${page}`);
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
    return { error, data: null };
  }
};

export const updateContainer = async (id, containerData) => {
  try {
    const response = await authorizedApiClient.put(`/containers/${id}`, {
      ...containerData,
    });

    console.log(containerData);
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
  const response = await authorizedApiClient.get(`/containers/history/${id}`);
  return response.data;
};
