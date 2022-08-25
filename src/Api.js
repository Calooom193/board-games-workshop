import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://callums-game-reviews.herokuapp.com/api',
});

export const getReviews = (category, sortSelected, order) => {
  let sort_by;
  if (sortSelected === '') {
    sort_by = null;
  } else {
    sort_by = sortSelected;
  }
  return gamesApi
    .get('/reviews', { params: { category, sort_by, order } })
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
      return res.data;
    });
};

export const postReview = (
  owner,
  title,
  review_body,
  designer,
  category,
  review_img_url
) => {
  return gamesApi
    .post(`/reviews`, {
      owner,
      title,
      review_body,
      designer,
      category,
      review_img_url,
    })
    .then((res) => {
      return res.data;
    });
};

export const deleteComment = (review_id) => {
  return gamesApi.delete(`/comments/${review_id}`);
};

export const getUsers = () => {
  return gamesApi.get(`/users`).then((res) => res.data);
};

export const deleteReview = (review_id) => {
  return gamesApi.delete(`/reviews/${review_id}`);
};
