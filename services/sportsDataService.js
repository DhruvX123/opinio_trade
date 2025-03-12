
const axios = require('axios');

const API_KEY = '2646187495fc381b2f2f112652446237'; 
const BASE_URL = 'https://api-sports.io';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-apisports-key': API_KEY,
  },
});

const getLiveEvents = async () => {
  try {
    const response = await apiClient.get('/v3/fixtures', {
      params: { live: 'all' },
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching live events:', error);
    throw error;
  }
};

const getEventResult = async (eventId) => {
  try {
    const response = await apiClient.get(`/v3/fixtures?id=${eventId}`);
    return response.data.response[0];
  } catch (error) {
    console.error('Error fetching event result:', error);
    throw error;
  }
};

module.exports = {
  getLiveEvents,
  getEventResult,
};
