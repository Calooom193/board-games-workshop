import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../Api';
import { ListReviewCard } from './ListReviewCard';
import { Nav } from './Nav';

export const SingleCategory = () => {
  const { category } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getReviews(category)
      .then(({ reviews }) => {
        setIsLoading(false);
        setReviews(reviews);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [category]);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <main className="single-category">
      <Nav />
      <h1 className="category-name">
        {category.toUpperCase().replace(/-/g, ' ')}
      </h1>
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
