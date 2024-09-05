import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../utils/jwt';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_ENDPOINTS = {
  POSTS: '/posts',
  LOGIN: '/account/login',
  REGISTER: '/account/register',
  ACCOUNTS: '/accounts'
  // Add more endpoints as needed
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
      // Add any other static headers here
    },
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
  }
  return config;
});

interface RequestConfig extends AxiosRequestConfig {
    method: string;
}

const createRequest = async (config: RequestConfig) => {
  const response = await api(config);
  return response.data;
};



export const get = (endpoint: string, params = {}, headers = {}) => {
  return createRequest({
    method: 'get',
    url: endpoint,
    params,
    headers: {
      ...headers,
    },
  });
};

export const post = (endpoint: string, data: Record<string, any>, headers = {}) => {
  return createRequest({
    method: 'post',
    url: endpoint,
    data,
    headers: {
      ...api.defaults.headers.common,
      ...headers,
    },
  });
};

export const put = (endpoint: string, data: Record<string, any>, headers = {}) => {
  return createRequest({
    method: 'put',
    url: endpoint,
    data,
    headers: {
      ...api.defaults.headers.common,
      ...headers,
    },
  });
};

export const destroy = (endpoint: string, headers = {}) => {
  return createRequest({
    method: 'delete',
    url: endpoint,
    headers: {
      ...api.defaults.headers.common,
      ...headers,
    },
  });
};
