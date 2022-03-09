import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getReview, patchVotes } from '../Api';

export const SingleReview = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});

  useEffect(() => {
    getReview(review_id).then((data) => {
      setReview(data.review[0]);
    });
  }, []);

  const incVotes = (e) => {
    console.log(e);
    //make it so that the user can only like once for each review
    patchVotes(review_id)
      .then((data) => setReview(data.review[0]))
      .catch((err) => console.log(err));
  };

  const {
    title,
    review_img_url,
    category,
    comment_count,
    created_at,
    designer,
    owner,
    review_body,
    votes,
  } = review;

  return (
    <div className="single-review">
      <dl>
        <dt>
          <h3>{title}</h3>
        </dt>
        <dt>{owner}</dt>
        <dt>Published: {String(created_at).substring(0, 10)}</dt>
        <dt>
          Category type:<Link to={`/reviews/${category}`}>{category}</Link>
        </dt>
        <dt>
          <img className="list-img" src={review_img_url} alt="" />
        </dt>
        <dt>designed by: {designer}</dt>
        <dt>
          <p>{review_body}</p>
        </dt>
        <dt>
          <button onClick={incVotes}>Like</button> {votes}
        </dt>
      </dl>
    </div>
  );
};
