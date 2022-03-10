import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const theme = createTheme({
  palette: {
    primary: {
      main: pink[50],
    },
  },
});

export const HeartButton = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Checkbox
          color="primary"
          {...label}
          icon={<FavoriteBorder color="primary" />}
          checkedIcon={<Favorite />}
        />
      </ThemeProvider>
    </div>
  );
};
