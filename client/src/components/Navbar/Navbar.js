import React from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
  variant="h6"
  component={Link}
  to="/"
  style={{
    textDecoration: 'none',
    fontFamily: "'Pacifico', cursive",
    color: 'rgba(0,183,255,1)',
    fontSize: '1.3rem',
    
  }}
>
  Share your day, your way — every moment matters.
</Typography>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
           {/* <Avatar style={{ marginRight: 10 }}>
  {user?.result?.firstName?.charAt(0)}
</Avatar> */}
<Typography variant="h6" style={{ marginRight: 20 }}>
  {user?.result?.firstName}
</Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}sx={{
    backgroundColor: '#f8bbd0',
    color: '#ec407a',
    borderRadius: '8px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#880e4f',
    },
  }}>Logout</Button>
          </div>
        ) : (
          <Button
  variant="contained"
  onClick={() => navigate('/auth')}
  sx={{
    backgroundColor: '#f8bbd0',
    color: '#ec407a',
    borderRadius: '8px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#880e4f',
    },
  }}
>
  Sign In
</Button>

        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
