import { Info } from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Button,
  createTheme,
  InputAdornment,
  MenuItem,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { pink } from '@mui/material/colors';
import { useState } from 'react';
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
  const [categorySelected, setCategorySelected] = useState('');
  const [createCategory, setCreateCategory] = useState(false);

  const handleCategorySelected = (e) => {
    if (e.target.value === 'create') {
      setCreateCategory(true);
      setCategorySelected('');
    } else {
      setCreateCategory(false);
      setCategorySelected(e.target.value);
    }
  };

  return (
    <div className="post-review">
      <GoHomeButton />
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
          placeholder="Give your review a quirky title!"
        />
        <TextField
          sx={{ paddingBottom: 3 }}
          id="input-with-icon-textfield"
          label="Designer"
          variant="standard"
          placeholder="Who designed the game?"
        />
        <TextField
          sx={{ paddingBottom: 0 }}
          id="input-with-icon-textfield"
          label="Image URL"
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
          variant="standard"
          placeholder="Create your most eloquent review..."
        />
        <TextField
          sx={{ paddingBottom: 0 }}
          id="standard-select-currency"
          select
          label="Category"
          value={categorySelected}
          onChange={handleCategorySelected}
          helperText="Please select a category that best describes the board game you are reviewing, or just create a new one!"
          variant="standard"
        >
          <MenuItem value="create">Create a category...</MenuItem>
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
        {createCategory ? (
          <TextField
            sx={{ paddingBottom: 0 }}
            id="input-with-icon-textfield"
            label="Create a category"
            variant="standard"
            placeholder="Think about broad topics your game might fit into."
          />
        ) : (
          <></>
        )}
        <ThemeProvider theme={theme}>
          <Button
            type="submit"
            color="primary"
            sx={{
              width: 0.92,
            }}
            variant="contained"
          >
            Post
          </Button>
        </ThemeProvider>
      </Box>
    </div>
  );
};

// owner, title, review_body, designer, category, review_img_url
