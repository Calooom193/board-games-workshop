import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../Api';
import { ErrorPage } from './ErrorPage';
import { ListReviewCard } from './ListReviewCard';
import { Nav } from './Nav';

export const SingleCategory = ({
  sortSelected,
  setSortSelected,
  categorySelected,
  setCategorySelected,
  categories,
  order,
  setOrder,
}) => {
  const { category } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemDeleted, setItemDeleted] = useState(false);

  useEffect(() => {
    getReviews(category, sortSelected, order)
      .then(({ reviews }) => {
        setIsLoading(false);
        setReviews(reviews);
      })
      .catch((err) => {
        setError(err);
      });
  }, [category, sortSelected, order, itemDeleted]);

  if (error) return <ErrorPage error={error} />;

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
    <main className="single-category">
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
