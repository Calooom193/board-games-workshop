import { Button, createTheme, ThemeProvider } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: pink[50],
    },
    secondary: {
      main: pink[100],
    },
  },
});

export const LearnMoreButton = ({ review_id }) => {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Button
        size="small"
        color="primary"
        variant="outlined"
        onClick={() => {
          navigate(`/review/${review_id}`);
        }}
      >
        Read more
      </Button>
    </ThemeProvider>
  );
};
