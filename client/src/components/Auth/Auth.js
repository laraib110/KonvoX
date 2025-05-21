// client/src/components/Auth/Auth.js
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', password: ''
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      if (isSignup) {
        await dispatch(signup(formData, navigate));
      } else {
        await dispatch(signin(formData, navigate));
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong');
    }
  };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setFormData({ firstName: '', lastName: '', username: '', password: '' });
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
  <Container component="main" maxWidth="lg">
  <Paper
    elevation={6}
    sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '16px', // Rounded like AppBar
      width: '90%',
      marginLeft: '20px',
    }}
  >

        <Avatar sx={{ bgcolor: 'rgb(22, 115, 132)' }}>
  <LockOutlinedIcon />
</Avatar>

        <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>
  {isSignup ? 'Sign Up' : 'Sign In'}
</Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField name="firstName" label="First Name" fullWidth variant="outlined"
  sx={{ mb: 2 }} required onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="lastName" label="Last Name" fullWidth variant="outlined"
  sx={{ mb: 2 }} required onChange={handleChange} />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField name="username" label="Username" fullWidth variant="outlined"
  sx={{ mb: 2 }} required value={formData.username} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" label="Password" type="password" fullWidth variant="outlined"
  sx={{ mb: 2 }} required onChange={handleChange} />
            </Grid>
          </Grid>
          <Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    mt: 2,
    backgroundColor: 'rgb(128, 201, 214)',
    color: 'rgb(22, 115, 132)',
    borderRadius: '8px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'rgb(16, 78, 89)',
    },
  }}
>
  {isSignup ? 'Sign Up' : 'Sign In'}
</Button>

          <Grid container justifyContent="center" sx={{ mt: 2 }}>
  <Grid item>
    <Button onClick={switchMode} sx={{ textTransform: 'none', color: '#1976d2' }}>
      {isSignup
        ? 'Already have an account? Sign In'
        : "Don't have an account? Sign Up"}
    </Button>
  </Grid>
</Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
