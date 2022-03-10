import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { getReviews } from '../Api';
import { ListReviewCard } from './ListReviewCard';
import { Nav } from './Nav';

export const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews().then(({ reviews }) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <main className="allreviews">
      <Nav />
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
            <div key={review_id}>
              <ListReviewCard
                review_id={review_id}
                owner={owner}
                title={title}
                review_img_url={review_img_url}
                category={category}
                created_at={created_at}
                votes={votes}
              />
            </div>
          );
        }
      )}
    </main>
  );
};
