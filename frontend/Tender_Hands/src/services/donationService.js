// src/services/donationService.js
import api from './api';

const donationService = {
  createDonation: async (donationData) => {
    try {
      const response = await api.post('/donations', donationData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getDonationHistory: async () => {
    try {
      const response = await api.get('/donations/history');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  setupRecurringDonation: async (donationData) => {
    try {
      const response = await api.post('/donations/recurring', donationData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  cancelRecurringDonation: async (donationId) => {
    try {
      const response = await api.delete(`/donations/recurring/${donationId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default donationService;
