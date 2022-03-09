import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getReview } from '../Api';

export const SingleReview = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});

  useEffect(() => {
    getReview(review_id).then((data) => {
      setReview(data.review[0]);
    });
  }, []);

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
        <dt>
          <time dateTime={created_at}>{created_at}</time>
        </dt>
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
          <button>Vote</button>
          {votes}
        </dt>
      </dl>
    </div>
  );
};
