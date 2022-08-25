import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { getReviews } from '../Api';
import { ListReviewCard } from './ListReviewCard';
import { Nav } from './Nav';

export const AllReviews = ({
  sortSelected,
  setSortSelected,
  categorySelected,
  setCategorySelected,
  categories,
  order,
  setOrder,
}) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [itemDeleted, setItemDeleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReviews(null, sortSelected, order)
      .then(({ reviews }) => {
        setIsLoading(false);
        setReviews(reviews);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [sortSelected, order, itemDeleted]);

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  return (
    <main className="allreviews">
      <Nav
        sortSelected={sortSelected}
        setSortSelected={setSortSelected}
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
        categories={categories}
        order={order}
        setOrder={setOrder}
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
                setItemDeleted={setItemDeleted}
              />
            </div>
          );
        }
      )}
    </main>
  );
};
