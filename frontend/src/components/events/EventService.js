import axios from 'axios';

const API_URL = 'http://localhost:8000/api/events';

const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

const addEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    return null;
  }
};

const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    return null;
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    return null;
  }
};

export default {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};
