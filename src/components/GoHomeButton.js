import { Button, createTheme, ThemeProvider } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
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
      <Button
        size="small"
        color="primary"
        variant="outlined"
        endIcon={<HomeIcon sx={{ color: pink[900] }} />}
        onClick={() => {
          navigate(`/`);
        }}
      >
        Go Home
      </Button>
    </ThemeProvider>
  );
};
