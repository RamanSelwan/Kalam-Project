import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'; // Default to localhost if not set

export const apiConnect = async (url, method, body = {}) => { 
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    const options = {
      method,
      url: `${BASE_URL}/${url}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', // Include the token in the headers if it exists
      },
      data: body,
    };

    const response = await axios(options);

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API call error:', error.response.data);
      throw new Error(`HTTP error! status: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API call error: No response received', error.request);
      throw new Error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API call error:', error.message);
      throw new Error(error.message);
    }
  }
};
