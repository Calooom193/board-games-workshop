import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { pink } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { getUsers } from '../Api';

const theme = createTheme({
  palette: {
    primary: {
      main: pink[50],
    },
    secondary: {
      main: pink[100],
    },
  },
});

export const SignIn = () => {
  const [usersList, setUsersList] = useState([]);
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    getUsers().then((users) => {
      setUsersList(users.users);
    });
  }, []);

  return (
    <div className="signIn">
        <ThemeProvider theme={theme}>
      <FormControl fullWidth>
        <InputLabel id="user-select">Select user</InputLabel>
        <Select
          labelId="user-select"
          value={selected}
          label="select-user"
          variant="standard"
          onChange={handleChange}
        >
          {usersList.map((user) => {
            return (
              <MenuItem key={user.username} value={user.username}>
                {user.username}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
        <Button className='login-button' size="small" color="primary" variant="outlined">
          Login
        </Button>
      </ThemeProvider>
    </div>
  );
};
