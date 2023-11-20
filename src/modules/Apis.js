// Import Axios HTTP client 
import axios from 'axios';

// Base URL of your backend API
const BASE_URL = 'http://localhost:5001';

// API methods
const api = {
  getTitles: async (url) => {
  try {
    const endpoint = url || `${BASE_URL}/api/titles?pageSize=10&page=0`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
    },
    getTitle: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/titles/${id}`);
            return response.data;
        } catch (error) {
            // Handle error
            console.error('Error fetching data:', error);
            throw error;
        }
    },
    getPersons: async (params) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/persons`, { params });
            return response.data;
        } catch (error) {
            // Handle error
            console.error('Error fetching data:', error);
            throw error;
        }
    },
    getPerson: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/persons/${id}`);
            return response.data;
        } catch (error) {
            // Handle error
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    getSearch: async (params) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/search`, { params });
            return response.data;
        } catch (error) {
            // Handle error
            console.error('Error fetching data:', error);
            throw error;
        }
    },

  postSomething: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users`, data);
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error posting data:', error);
      throw error;
    }
  },

  
};

export default api;
