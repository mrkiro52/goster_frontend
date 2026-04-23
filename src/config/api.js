const DEFAULT_API_BASE_URL = 'https://апи.гостер.рф/api';

const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = (envApiBaseUrl || DEFAULT_API_BASE_URL).replace(/\/$/, '');
