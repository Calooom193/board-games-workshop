import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://callums-game-reviews.herokuapp.com/api',
});

export const getReviews = () => {
  return gamesApi.get('/reviews').then(res => res.data);
};
