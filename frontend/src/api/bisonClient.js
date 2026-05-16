import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const bisonClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

bisonClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

bisonClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const bisonAPI = {
  auth: {
    login: async (mobile, password) => {
      const response = await bisonClient.post('/auth/login', { mobile, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    },
    register: async (mobile, password, role) => {
      const response = await bisonClient.post('/auth/register', { mobile, password, role });
      return response.data;
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    },
    getCurrentUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
  },
  trucks: {
    list: async () => (await bisonClient.get('/trucks/all')).data.data || [],
    create: async (data) => (await bisonClient.post('/trucks/add', data)).data,
    update: async (id, data) => (await bisonClient.put(`/trucks/${id}`, data)).data,
    delete: async (id) => (await bisonClient.delete(`/trucks/${id}`)).data,
  },
  drivers: {
    list: async () => (await bisonClient.get('/drivers/all')).data.data || [],
    create: async (data) => (await bisonClient.post('/drivers/add', data)).data,
    update: async (id, data) => (await bisonClient.put(`/drivers/${id}`, data)).data,
    delete: async (id) => (await bisonClient.delete(`/drivers/${id}`)).data,
  },
  loads: {
    list: async () => (await bisonClient.get('/loads/all')).data.data || [],
    create: async (data) => (await bisonClient.post('/loads/add', data)).data,
  },
  trips: {
    list: async () => (await bisonClient.get('/trips/all')).data.data || [],
    create: async (data) => (await bisonClient.post('/trips/add', data)).data,
    complete: async (id) => (await bisonClient.put(`/trips/complete/${id}`)).data,
  },
  transporters: {
    list: async () => (await bisonClient.get('/transporters/all')).data.data || [],
    create: async (data) => (await bisonClient.post('/transporters/add', data)).data,
    update: async (id, data) => (await bisonClient.put(`/transporters/${id}`, data)).data,
    delete: async (id) => (await bisonClient.delete(`/transporters/${id}`)).data,
  },
  shippers: {
    list: async () => (await bisonClient.get('/shippers/all')).data.data || [],
    create: async (data) => (await bisonClient.post('/shippers/add', data)).data,
    update: async (id, data) => (await bisonClient.put(`/shippers/${id}`, data)).data,
    delete: async (id) => (await bisonClient.delete(`/shippers/${id}`)).data,
  },
  expenses: {
    list: async () => (await bisonClient.get('/expenses/all')).data.data || [],
    create: async (data) => (await bisonClient.post('/expenses/add', data)).data,
    delete: async (id) => (await bisonClient.delete(`/expenses/${id}`)).data,
    approve: async (id) => (await bisonClient.put(`/expenses/approve/${id}`)).data,
  },
  transactions: {
    list: async () => (await bisonClient.get('/transactions/all')).data.data || [],
  },
  subscription: {
    getPlans: async () => (await bisonClient.get('/subscription/plans')).data.data || [],
    subscribe: async (planId) => (await bisonClient.post('/subscription/subscribe', { plan_id: planId })).data,
  },
};

export default bisonClient;
