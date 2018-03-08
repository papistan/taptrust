import axios from 'axios';

const getApiClient = (options = {}) => {
  const headers = {};

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  return axios.create({
    baseURL: process.env.API_BASE_URL,
    headers
  });
};

export const createToken = payload => getApiClient().post('/tokens', payload);

export const getAllTokens = () => getApiClient().get('/tokens');

export const getTokenByName = tokenId =>
  getApiClient().get(`/tokens/${tokenId}`);

export const createReview = (tokenId, payload) =>
  getApiClient().post(`/tokens/${tokenId}/reviews`, payload);

export const signin = payload => axios.post('http://localhost:8000/signin', payload);

export const signup = payload => axios.post('http://localhost:8000/signup', payload);

export const signedin = () => axios.get('http://localhost:8000/signedin');

export const logout = () => axios.get('http://localhost:8000/logout')

export const getReview = reviewId => getApiClient().get(`/reviews/${reviewId}`);

