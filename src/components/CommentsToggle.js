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
import { makeStyles } from '@material-ui/styles';
import { grey, pink, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import { deleteComment, getComments, postComment } from '../Api';
import { UserContext } from '../contexts/User';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    secondary: {
      main: pink[900],
    },
  },
});

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  zIndex: 'tooltip',
  mt: '5px',
  color: pink[900],
  marginTop: 3,
};

const useStyles = makeStyles({
  root: {
    // input label when focused
    '& label.Mui-focused': {
      color: pink[900],
    },
    // focused color for input with variant='standard'
    '& .MuiInput-underline:after': {
      borderBottomColor: pink[900],
    },
  },
  invalid: {
    // input label when focused
    '& label.Mui-focused': {
      color: red[700],
    },
    // focused color for input with variant='standard'
    '& .MuiInput-underline:after': {
      borderBottomColor: red[700],
    },
  },
});

export const CommentsToggle = ({ review_id }) => {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

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
    if (input) {
      setInvalid(false);
      setIsLoading(true);
      postComment(review_id, userLoggedIn, input)
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
    } else {
      setInvalid(true);
    }
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
      <div className="view-comment-toggle">
        <h3
          onClick={() => {
            setCollapsed((currState) => {
              return !currState;
            });
          }}
          className="comment-list-title"
        >
          {collapsed ? 'Show' : 'Hide'} comments
        </h3>
        {collapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="24px"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="24px"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {comments.map(({ author, body, created_at, comment_id }) => {
        if (author === userLoggedIn) {
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

      {userLoggedIn !== null ? (
        <div className=''>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 0.5, width: '25ch' },
              display: 'flex',
              alignContent: 'center',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              focused={invalid}
              className={!invalid ? classes.root : classes.invalid}
              id="standard-basic"
              label="Write a comment..."
              variant="standard"
              value={input}
              onChange={(e) => {
                setInvalid(false);
                setInput(e.target.value);
              }}
            />
            <Button
              type="submit"
              sx={{
                color: pink[900],
                width: 1,
                justifyContent: 'right',
                alignItems: 'flex-end',
              }}
            >
              Post
            </Button>
          </Box>
          {invalid ? (
            <div className="empty-field-text">
              <h5>Empty field:</h5>
              <p>Please provide some text to post a comment.</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </List>
  );
};
