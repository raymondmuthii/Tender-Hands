// src/services/charityService.js
import api from './api';

const charityService = {
  getFeaturedCharities: async () => {
    try {
      const response = await api.get('/api/charities/featured');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllCharities: async () => {
    try {
      const response = await api.get('/api/charities');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getCharityById: async (id) => {
    try {
      const response = await api.get(`/api/charities/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  applyCharity: async (charityData) => {
    try {
      const response = await api.post('/api/charities/apply', charityData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateCharity: async (id, charityData) => {
    try {
      const response = await api.put(`/api/charities/${id}`, charityData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  approveCharity: async (id) => {
    try {
      const response = await api.put(`/api/charities/${id}/approve`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default charityService;
