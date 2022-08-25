import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlinedIcon from '@mui/icons-material/Delete';
import { blueGrey, orange, pink } from '@mui/material/colors';
import { LearnMoreButton } from './LearnMoreButton';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/User';
import { deleteReview } from '../Api';

const theme = createTheme({
  palette: {
    primary: {
      main: pink[50],
    },
  },
});

export const ListReviewCard = ({
  review_id,
  owner,
  title,
  review_img_url,
  created_at,
  votes,
  setItemDeleted,
}) => {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    setIsLoading(true);
    deleteReview(id)
      .then(() => {
        setIsLoading(false);
        setItemDeleted((currState) => {
          return !currState;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <ThemeProvider theme={theme}>
          <Button size="small" color="primary">
            {/* <p className="hearts">Hearts: </p>  */}
            <FavoriteIcon color="primary" sx={{ marginRight: '10px' }} />
            {votes}
          </Button>
        </ThemeProvider>
        <LearnMoreButton review_id={review_id} />
        {owner === userLoggedIn ? (
          <ThemeProvider theme={theme}>
            <IconButton
              color="primary"
              size="small"
              aria-label="delete"
              onClick={() => handleDelete(review_id)}
              sx={{ width: '145px', justifyContent: 'right' }}
            >
              <DeleteOutlinedIcon fontSize="inherit" />
            </IconButton>
          </ThemeProvider>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
};
