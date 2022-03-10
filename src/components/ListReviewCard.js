import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import {
  amber,
  blueGrey,
  brown,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from '@mui/material/colors';
import { HeartButton } from './HeartButton';
import { LearnMoreButton } from './LearnMoreButton';

export const ListReviewCard = ({
  review_id,
  owner,
  title,
  review_img_url,
  category,
  created_at,
  votes,
}) => {
  return (
    <Card className="list-card" sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{ bgcolor: blueGrey[900] }}>
        <CardMedia
          component="img"
          height="140"
          image={review_img_url}
          alt={title}
        />
        <CardContent sx={{ bgcolor: orange[50] }}>
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
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ bgcolor: pink[900] }}>
        <Button size="small" color="warning">
          <HeartButton /> {votes}
        </Button>
        <LearnMoreButton review_id={review_id} />
      </CardActions>
    </Card>
  );
};
