import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReview, patchVotes } from '../Api';
import { HeartButton } from './HeartButton';
import { pink } from '@mui/material/colors';
import { GoHomeButton } from './GoHomeButton';

export const SingleReview = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReview(review_id)
      .then((data) => {
        setIsLoading(false);
        setReview(data.review[0]);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
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

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="single-review">
      <Card>
        <CardActionArea>
          <CardActions>
            <GoHomeButton />
          </CardActions>
        </CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={review_img_url}
          alt={title}
        />
        <Typography variant="body2" color="text.secondary">
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
            {owner} | Published: {String(created_at).substring(0, 10)}
          </Typography>
          <br />
          <Typography variant="body1" color="text.primary">
            <Paper elevation={3}>{review_body}</Paper>
          </Typography>
          <Paper elevation={1} className="vote-button" sx={{ width: 100 }}>
            <Typography sx={{ bgcolor: pink[900] }}>
              <HeartButton review_id={review_id} setReview={setReview} />
            </Typography>
            <Typography>{votes}</Typography>
          </Paper>
        </CardContent>
      </Card>
    </div>
  );
};
