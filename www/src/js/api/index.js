import axios from 'axios';

export const createToken = payload => {
  const url = 'http://localhost:8000/api/tokens';

  return axios.post(url, payload);
};

export const getAllTokens = () => {
  const url = 'http://localhost:8000/api/tokens';

  return axios.get(url);
};

export const getToken = tokenId => {
  const url = `http://localhost:8000/api/tokens/${tokenId}`;

  return axios.get(url);
};

export const getReview = reviewId => {
  const url = `http://localhost:8000/api/reviews/${reviewId}`;

  return axios.get(url);
};

export const createReviewOfToken = (tokenId, payload) => {
  const url = `http://localhost:8000/api/tokens/${tokenId}/reviews`;

  return axios.post(url, payload);
};
