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

export const patchVotes = (review_id, incNum) => {
  return gamesApi
    .patch(`/reviews/${review_id}`, { votes: incNum })
    .then((res) => res.data);
};

export const getComments = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}/comments`).then((res) => res.data);
};

export const postComment = (review_id, username, body) => {
  return gamesApi
    .post(`/reviews/${review_id}/comments`, { username, body })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const deleteComment = (review_id) => {
  return gamesApi
    .delete(`/comments/${review_id}`)
};
