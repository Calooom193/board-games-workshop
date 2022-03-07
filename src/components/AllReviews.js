import { useEffect } from 'react';
import { getReviews } from '../Api';
import { ListReviewCard } from './ListReviewCard';

export const AllReviews = ({ reviews, setReviews }) => {
  useEffect(() => {
    getReviews().then(({ reviews }) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <div className="allreviews">
      <form className="sort_by">
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
      </form>

      <ul>
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
              <li key={review_id}>
                <ListReviewCard
                  review_id={review_id}
                  owner={owner}
                  title={title}
                  review_img_url={review_img_url}
                  category={category}
                  created_at={created_at}
                  votes={votes}
                />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};
