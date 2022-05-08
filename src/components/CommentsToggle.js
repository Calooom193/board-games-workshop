import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  IconButton,
} from '@mui/material';
import { grey, pink } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { deleteComment, getComments, postComment } from '../Api';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    secondary: {
      main: pink[100],
    },
  },
});

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  zIndex: 'tooltip',
  mt: '5px',
};

export const CommentsToggle = ({ review_id, comment_count }) => {
  const [comments, setComments] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [username] = useState('tickle122');

  useEffect(() => {
    setIsLoading(true);
    if (!collapsed) {
      getComments(review_id).then(({ comments }) => {
        setComments(comments);
        setIsLoading(false);
      });
    } else {
      setComments([]);
      setIsLoading(false);
    }
  }, [collapsed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postComment(review_id, username, input)
      .then((data) => {
        setIsLoading(false);
        setComments((currComments) => {
          return [...currComments, data.comment[0]];
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setCollapsed(false);
    setInput('');
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    deleteComment(id).then(() => {
      setIsLoading(false);
      setComments((currComments) => {
        return currComments.filter((comment) => comment.comment_id !== id);
      });
    });
  };

  if (isLoading) {
    return (
      <h2>
        <LoadingButton loading>Submit</LoadingButton>
      </h2>
    );
  }
  return (
    <List
      className="comment-section"
      sx={style}
      component="nav"
      aria-label="mailbox folders"
    >
      <br />
      <Divider />
      <h3
        onClick={() => {
          setCollapsed((currState) => {
            return !currState;
          });
        }}
        className="comment-list-title"
      >
        View Comments
      </h3>
      <Divider />
      {comments.map(({ author, body, created_at, comment_id }) => {
        if (author === username) {
          return (
            <div key={comment_id}>
              <ListItem className="comment-item" alignItems="flex-start">
                <ListItemText
                  className="comment-author"
                  primary={author}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {String(created_at).substring(0, 10)}
                      </Typography>
                      {` - ${body}`}
                    </>
                  }
                />
                <ThemeProvider theme={theme}>
                  <IconButton
                    size="small"
                    aria-label="delete"
                    variant="outlined"
                    onClick={() => handleDelete(comment_id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </ThemeProvider>
              </ListItem>
              <Divider />
            </div>
          );
        } else {
          return (
            <div key={comment_id}>
              <ListItem className="comment-item" alignItems="flex-start">
                <ListItemText
                  className="comment-author"
                  primary={author}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {String(created_at).substring(0, 10)}
                      </Typography>
                      {` - ${body}`}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          );
        }
      })}
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Write a comment..."
          variant="standard"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button type="submit" sx={{ color: pink[900] }}>
          Post
        </Button>
      </Box>
    </List>
  );
};
