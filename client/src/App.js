// client/src/App.js
import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { useLocation } from 'react-router-dom';


import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './images/memories.png';
const Home = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return user ? (
    <Grow in>
      <Container>
        <div className="home-container">
        <Grid container spacing={3} justifyContent="space-between" alignItems="stretch">
          <Grid item xs={12} sm={8}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <Posts setCurrentId={setCurrentId} />
            </div>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ maxWidth: '500px' , marginLeft: 'auto' }}>
           
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          
          </Grid>
        </Grid>
        </div>
      </Container>
    </Grow>

  ) : null;
};


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (user) {
      dispatch(getPosts());
    }
  }, [currentId, dispatch, user]);

  return (
    <Container maxWidth="lg">
      {!isAuthPage && <Navbar />}
      <AppBar className={classes.appBar} position="static" color="inherit">
        <img src={memories} alt="Polaroid Icon" className={classes.image} />
        {/* <Typography className={classes.heading} variant="h2" align="center">KonvoX</Typography> */}
      </AppBar>
      <Routes>
        <Route path="/" element={<Home currentId={currentId} setCurrentId={setCurrentId} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Container>
  );
};

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
