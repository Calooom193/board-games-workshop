import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../Api';
import { ListReviewCard } from './ListReviewCard';

export const SingleCategory = () => {
  const { category } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(category).then(({ reviews }) => {
      console.log(reviews);
      setReviews(reviews);
    });
  }, [category]);

  return (
    <div className="single-category">
      <h1>{category}</h1>
      {/* <form className="sort_by">
        <label htmlFor="sortby">Sort by: </label>
        <select id="sortby">
          <option disabled selected>
            Pick an option...
          </option>
          <option>Author</option>
          <option>Date</option>
          <option>Title</option>
          <option>Vote count</option>
        </select>
      </form> */}
      <dl>
        {reviews.map(
          ({
            review_id,
            owner,
            title,
            review_img_url,
            category,
            created_at,
            votes,
          }) => {
            return (
              <dt key={review_id}>
                <ListReviewCard
                  review_id={review_id}
                  owner={owner}
                  title={title}
                  review_img_url={review_img_url}
                  category={category}
                  created_at={created_at}
                  votes={votes}
                />
              </dt>
            );
          }
        )}
      </dl>
    </div>
  );
};
