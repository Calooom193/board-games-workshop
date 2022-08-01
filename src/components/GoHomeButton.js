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

  const handleHome = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="home-button" onClick={handleHome}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={theme.palette.primary.main}
          strokeWidth="2"
          width="16px"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <Button
          variant="text"
          sx={{ paddingLeft: '0px', justifyContent: 'left' }}
        >
          Back
        </Button>
      </div>
    </ThemeProvider>
  );
};
