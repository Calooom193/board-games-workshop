import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListReviewCard } from './ListReviewCard';

export const SingleCategory = ({ reviews }) => {
  const { category_name } = useParams();
  const [filteredReviews, setFilteredReviews] = useState([]);

  useState(() => {
    setFilteredReviews(() => {
      return reviews.filter((review) => review.category === category_name);
    });
  }, [category_name]);

  return (
    <div className="single-category">
      <h1>{category_name}</h1>
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
        {filteredReviews.map(
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
