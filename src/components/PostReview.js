import ImageIcon from '@mui/icons-material/Image';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  createTheme,
  InputAdornment,
  MenuItem,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { pink } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postReview } from '../Api';
import { UserContext } from '../contexts/User';
import { GoHomeButton } from './GoHomeButton';

const theme = createTheme({
  palette: {
    primary: {
      main: pink[900],
    },
    secondary: {
      main: pink[100],
    },
  },
});

export const PostReview = ({ categories }) => {
  const regex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  let navigate = useNavigate();
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [categorySelected, setCategorySelected] = useState('');
  const [title, setTitle] = useState('');
  const [designer, setDesigner] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidDesigner, setInvalidDesigner] = useState(false);
  const [invalidImgUrl, setInvalidImgUrl] = useState(false);
  const [invalidReviewBody, setInvalidReviewBody] = useState(false);
  const [invalidCategory, setInvalidCategory] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);
  const [reviewPosted, setReviewPosted] = useState({});
  const [hasPosted, setHasPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasPosted) {
      navigate(`/review/${reviewPosted.review_id}`, { replace: true });
    }
  }, [hasPosted]);

  useEffect(() => {
    if (userLoggedIn) {
      setInvalidUser(false);
    }
  }, [userLoggedIn]);

  const handleTitle = (e) => {
    setInvalidTitle(false);
    setTitle(e.target.value);
  };

  const handleDesigner = (e) => {
    setInvalidDesigner(false);
    setDesigner(e.target.value);
  };

  const handleImgUrl = (e) => {
    setInvalidImgUrl(false);
    setImgUrl(e.target.value);
  };

  const handleReviewBody = (e) => {
    setInvalidReviewBody(false);
    setReviewBody(e.target.value);
  };

  const handleCategorySelected = (e) => {
    setInvalidCategory(false);
    setCategorySelected(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userLoggedIn) {
      setInvalidUser(true);
    } else if (title.length === 0) {
      setInvalidTitle(true);
    } else if (designer.length === 0) {
      setInvalidDesigner(true);
    } else if (imgUrl.length === 0) {
      setInvalidImgUrl(true);
    } else if (!regex.test(imgUrl)) {
      setInvalidImgUrl(true);
    } else if (reviewBody.length === 0) {
      setInvalidReviewBody(true);
    } else if (categorySelected.length === 0) {
      setInvalidCategory(true);
    } else {
      setIsLoading(true);
      postReview(
        userLoggedIn,
        title,
        reviewBody,
        designer,
        categorySelected,
        imgUrl
      )
        .then(({ review }) => {
          setReviewPosted(review[0]);
          setIsLoading(false);
          setHasPosted(true);
        })
        .catch((err) => {
          setHasPosted(false);
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  return (
    <div className="post-review">
      <GoHomeButton />
      {invalidUser ? (
        <div className="invalid-user">
          <h5>Please Log in to post a review.</h5>
        </div>
      ) : (
        <></>
      )}
      <Box
        sx={{
          '& > :not(style)': {
            m: 2,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 1,
          },
        }}
      >
        <TextField
          sx={{ paddingBottom: 0 }}
          id="input-with-icon-textfield"
          label="Title"
          variant="standard"
          error={invalidTitle}
          helperText={invalidTitle ? 'Required*' : ''}
          value={title}
          onChange={handleTitle}
          placeholder="Give your review a quirky title!"
        />
        <TextField
          sx={{ paddingBottom: 3 }}
          id="input-with-icon-textfield"
          label="Designer"
          variant="standard"
          error={invalidDesigner}
          helperText={invalidDesigner ? 'Required*' : ''}
          value={designer}
          onChange={handleDesigner}
          placeholder="Who designed the game?"
        />
        <TextField
          sx={{ paddingBottom: 0 }}
          id="input-with-icon-textfield"
          label="Image URL"
          value={imgUrl}
          onChange={handleImgUrl}
          error={invalidImgUrl}
          helperText={invalidImgUrl ? 'Required* Invalid URL' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ImageIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          sx={{ paddingBottom: 0 }}
          id="review-body-field"
          label="Review"
          multiline
          rows={4}
          error={invalidReviewBody}
          helperText={invalidReviewBody ? 'Required*' : ''}
          variant="standard"
          value={reviewBody}
          onChange={handleReviewBody}
          placeholder="Create your most eloquent review..."
        />
        <TextField
          sx={{ paddingBottom: 0 }}
          id="standard-select-currency"
          select
          label="Category"
          value={categorySelected}
          onChange={handleCategorySelected}
          error={invalidCategory}
          helperText={invalidCategory ? 'Required*' : ''}
          variant="standard"
        >
          {categories.map((c) => {
            return (
              <MenuItem
                className="category-menu-item"
                value={c.slug}
                key={c.slug}
              >
                {c.slug.replace(/-/g, ' ')}
              </MenuItem>
            );
          })}
        </TextField>

        <ThemeProvider theme={theme}>
          <Button
            type="submit"
            color="primary"
            sx={{
              width: 0.92,
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Post
          </Button>
        </ThemeProvider>
      </Box>
    </div>
  );
};
