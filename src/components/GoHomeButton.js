import { Button, createTheme, ThemeProvider } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon } from './HomeIcon';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: pink[900],
    },
    secondary: {
      main: pink[100],
    },
  },
});

export const GoHomeButton = ({ review_id }) => {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      {/* TURN INTO A ICON BUTTON AND DO useNavigate BACK HOME WHILE RESETTING CATEGORY */}
      <Link component="button" color="primary" variant="body2" to={'/'}>
        Go Home
      </Link>
    </ThemeProvider>
  );
};
