import {
  Backdrop,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReview } from '../Api';
import { HeartButton } from './HeartButton';
import { pink } from '@mui/material/colors';
import { GoHomeButton } from './GoHomeButton';
import { CommentsToggle } from './CommentsToggle';
import { LoadingButton } from '@mui/lab';
import { ErrorPage } from './ErrorPage';

export const SingleReview = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [voteLoading, setVoteLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReview(review_id)
      .then((data) => {
        setIsLoading(false);
        setReview(data.review[0]);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const {
    title,
    review_img_url,
    comment_count,
    created_at,
    designer,
    owner,
    review_body,
    votes,
  } = review;

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
    <div className="single-review">
      <Card>
        <GoHomeButton />

        <CardMedia
          className="review-img"
          component="img"
          height="200"
          image={review_img_url}
          alt={title}
        />
        <Typography
          className="designer-text"
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '12px' }}
        >
          Game designer: {designer}
        </Typography>
        <CardContent>
          <Typography
            className="single-review-title"
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className="review-author">{owner}</span> | Published:{' '}
            {String(created_at).substring(0, 10)}
          </Typography>
          <br />
          <Typography
            sx={{ marginBottom: 5 }}
            variant="body1"
            color="text.primary"
          >
            {review_body}
          </Typography>
          <Paper
            elevation={1}
            className="vote-button"
            sx={{ width: 100, alignContent: 'left' }}
          >
            <Typography className="heart-button" sx={{ bgcolor: pink[900] }}>
              <HeartButton
                owner={owner}
                review_id={review_id}
                setReview={setReview}
                votes={votes}
                setVoteLoading={setVoteLoading}
                voteLoading={voteLoading}
              />
            </Typography>
            <Typography>
              {voteLoading ? (
                <LoadingButton loading>Submit</LoadingButton>
              ) : (
                votes
              )}
            </Typography>
          </Paper>
          <CommentsToggle review_id={review_id} comment_count={comment_count} />
        </CardContent>
      </Card>
    </div>
  );
};
