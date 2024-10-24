import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

export const sendVerificationCode = (phoneNumber) => {
  return axios.post('/auth/send-code/', { phone_number: phoneNumber });
};

export const verifyCode = (phoneNumber, code) => {
  return axios.post('/auth/verify-code/', { phone_number: phoneNumber, code });
};

// Other API functions...
