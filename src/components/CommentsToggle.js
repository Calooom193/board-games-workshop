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
} from '@mui/material';
import { pink } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { getComments, postComment } from '../Api';

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
        Comments ({comment_count})
      </h3>
      <Divider />
      {comments.map(({ author, body, created_at, comment_id }) => {
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
