import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GreenFuture
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/collaboration">
            Collaboration
          </Button>
          <Button color="inherit" component={Link} to="/feedback">
            Feedback
          </Button>
          <Button color="inherit" component={Link} to="/idea-submission">
            Idea Submission
          </Button>
          <Button color="inherit" component={Link} to="/reward">
            Reward
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
