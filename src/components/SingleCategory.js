import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../Api';
import { ListReviewCard } from './ListReviewCard';
import { Nav } from './Nav';

export const SingleCategory = () => {
  const { category } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(category).then(({ reviews }) => {
      setReviews(reviews);
    });
  }, [category]);

  return (
    <main className="single-category">
      <Nav />
      <h1>{category}</h1>
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
