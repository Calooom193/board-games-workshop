import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://callums-game-reviews.herokuapp.com/api',
});

export const getReviews = () => {
  return gamesApi.get('/reviews').then((res) => res.data);
};

export const getCategories = () => {
  return gamesApi.get('/categories').then((res) => res.data);
};

export const getReview = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}`).then((res) => res.data);
};
