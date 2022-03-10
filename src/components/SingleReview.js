import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReview, patchVotes } from '../Api';
import { HeartButton } from './HeartButton';
import { blueGrey, grey, lime, pink } from '@mui/material/colors';
import { GoHomeButton } from './GoHomeButton';

export const SingleReview = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    getReview(review_id).then((data) => {
      setReview(data.review[0]);
    });
  }, []);

  const incVotes = (e) => {
    console.log(e);
    //make it so that the user can only like once for each review
    patchVotes(review_id)
      .then((data) => setReview(data.review[0]))
      .catch((err) => console.log(err));
  };

  const {
    title,
    review_img_url,
    category,
    comment_count,
    created_at,
    designer,
    owner,
    review_body,
    votes,
  } = review;

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
              <HeartButton />
            </Typography>
            <Typography>{votes}</Typography>
          </Paper>
        </CardContent>
      </Card>
    </div>
  );
};

{
  /* <dl>
        <dt>
          <h3>{title}</h3>
        </dt>
        <dt>{owner}</dt>
        <dt>Published: {String(created_at).substring(0, 10)}</dt>
        <dt>
          Category type:<Link to={`/reviews/${category}`}>{category}</Link>
        </dt>
        <dt>
          <img className="list-img" src={review_img_url} alt="" />
        </dt>
        <dt>designed by: {designer}</dt>
        <dt>
          <p>{review_body}</p>
        </dt>
        <dt>
          <button onClick={incVotes}>Like</button> {votes}
        </dt>
      </dl> */
}
