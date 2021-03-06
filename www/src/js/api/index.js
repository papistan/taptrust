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

export const getToken = tokenId => getApiClient().get(`/tokens/${tokenId}`);

export const getReview = reviewId => getApiClient().get(`/reviews/${reviewId}`);

export const createReviewOfToken = (tokenId, payload) =>
  getApiClient().post(`/tokens/${tokenId}/reviews`, payload);
