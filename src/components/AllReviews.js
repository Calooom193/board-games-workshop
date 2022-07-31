import { useEffect, useState } from 'react';
import { getReviews } from '../Api';
import { ListReviewCard } from './ListReviewCard';
import { Nav } from './Nav';

export const AllReviews = ({
  sortSelected,
  setSortSelected,
  categorySelected,
  setCategorySelected,
  categories
}) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReviews(null, sortSelected)
      .then(({ reviews }) => {
        setIsLoading(false);
        setReviews(reviews);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [sortSelected]);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <main className="allreviews">
      <Nav
        sortSelected={sortSelected}
        setSortSelected={setSortSelected}
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
        categories={categories}
      />
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
