import authorizedApiClient from "./axios-instance";

export const getAllRepairments = async (page) => {
    const response = await authorizedApiClient.get(`/repairs?page=${page}`);
    return response.data;
}

export const getRepair = async (id) => {
    const response = await authorizedApiClient.get(`/repairs/${id}`);
    return response.data;
}