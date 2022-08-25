import React, { useContext, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';
import { patchVotes } from '../Api';
import { UserContext } from '../contexts/User';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const theme = createTheme({
  palette: {
    primary: {
      main: pink[50],
    },
  },
});

export const HeartButton = ({
  review_id,
  setReview,
  setVoteLoading,
  owner,
}) => {
  const { userLoggedIn } = useContext(UserContext);
  const [pressed, setPressed] = useState(null);

  const incVotes = (e) => {
    setVoteLoading(true);
    if (pressed === null || pressed === false) {
      patchVotes(review_id, 1)
        .then((data) => {
          setPressed(true);
          setReview((currReview) => {
            const newReview = { ...currReview };
            newReview.votes = data.review[0].votes;
            return newReview;
          });
          setVoteLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      patchVotes(review_id, -1)
        .then((data) => {
          setPressed(false);
          setReview((currReview) => {
            const newReview = { ...currReview };
            newReview.votes = data.review[0].votes;
            return newReview;
          });
          setVoteLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Checkbox
        className="heart-button"
        onClick={incVotes}
        disabled={!userLoggedIn || userLoggedIn === owner}
        color="primary"
        {...label}
        icon={<FavoriteBorder color="primary" />}
        checkedIcon={<Favorite />}
      />
    </ThemeProvider>
  );
};
