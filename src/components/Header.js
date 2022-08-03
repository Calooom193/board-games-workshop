import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { getUsers } from '../Api';
import { UserContext } from '../contexts/User';

export const Header = ({ setCategorySelected, setSortSelected }) => {
  let navigate = useNavigate();
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(({ users }) => {
      setUsers(users);
    });
  }, []);

  const handleClick = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleUserSelect = (username) => {
    if (!username) {
      setUserLoggedIn(null);
    }
    setUserLoggedIn(username);
    setDropDownOpen(false);
  };

  return (
    <div className="header">
      <h1
        onClick={() => {
          setCategorySelected('');
          setSortSelected('');
          navigate('/');
        }}
      >
        Board Games Workshop
      </h1>
      <div className="avatar-login">
        <Avatar
          onClick={handleClick}
          sx={{ color: pink[50], backgroundColor: pink[800] }}
        >
          {userLoggedIn ? userLoggedIn[0].toUpperCase() : null}
        </Avatar>
        {dropDownOpen ? (
          <div className="login-dropdown">
            {userLoggedIn ? (
              <div
                className="dropdown-username"
                onClick={() => handleUserSelect()}
              >
                <div className="username-text logout-text">Logout</div>
              </div>
            ) : (
              <></>
            )}
            {users.map((user) => (
              <div
                className="dropdown-username"
                onClick={() => handleUserSelect(user.username)}
                key={user.username}
              >
                <div className="username-text">{user.username}</div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
