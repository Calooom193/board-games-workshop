import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://callums-game-reviews.herokuapp.com/api',
});

export const getReviews = (category) => {
  return gamesApi
    .get('/reviews', { params: { category } })
    .then((res) => res.data);
};

export const getCategories = () => {
  return gamesApi.get('/categories').then((res) => res.data);
};

export const getReview = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}`).then((res) => res.data);
};

export const patchVotes = (review_id) => {
  return gamesApi
    .patch(`/reviews/${review_id}`, { votes: 1 })
    .then((res) => res.data);
};
