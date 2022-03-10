import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { patchVotes } from '../Api';
import LoadingButton from '@mui/lab/LoadingButton';

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
  voteLoading,
}) => {
  const [pressed, setPressed] = useState(null);

  const incVotes = (e) => {
    setVoteLoading(true);
    if (pressed === null || pressed === false) {
      patchVotes(review_id, 1)
        .then((data) => {
          setPressed(true);
          setReview(data.review[0]);
          setVoteLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      patchVotes(review_id, -1)
        .then((data) => {
          setPressed(false);
          setReview(data.review[0]);
          setVoteLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Checkbox
        onClick={incVotes}
        color="primary"
        {...label}
        icon={<FavoriteBorder color="primary" />}
        checkedIcon={<Favorite />}
      />
    </ThemeProvider>
  );
};
