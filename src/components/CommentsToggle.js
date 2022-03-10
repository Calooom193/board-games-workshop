import { LoadingButton } from '@mui/lab';
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { getComments } from '../Api';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export const CommentsToggle = ({ review_id, comment_count }) => {
  const [comments, setComments] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) {
    return (
      <h2>
        <LoadingButton loading>Submit</LoadingButton>
      </h2>
    );
  }
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
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
            <ListItem className="comment-item" button>
              <ListItemText className="comment-author" primary={author} />
              <ListItemText
                primary={
                  <p className="comment-date">
                    | {String(created_at).substring(0, 10)}
                  </p>
                }
              />
              <ListItemText primary={body} />
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
};
