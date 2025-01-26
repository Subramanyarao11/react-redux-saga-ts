import axios from 'axios';

export interface ApiErrorResponse {
  message?: string;
  success: boolean;
  statusCode: number;
  errors?: string[];
}

const BASE_URL = 'https://api.freeapi.app/api/v1/todos';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
});

export const api = async <T = unknown>(method: string, endpoint: string = '', data?: T) => {
  const response = await axiosInstance({
    method,
    url: endpoint,
    data: method !== 'GET' ? data : undefined,
    params: method === 'GET' ? data : undefined
  });
  return response.data;
};
