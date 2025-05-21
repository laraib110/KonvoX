// client/src/components/Form/Form.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post && post.creatorId === user?.result?._id) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postData.title.trim() || !postData.message.trim() || !postData.tags.length || !postData.selectedFile) {
    return;
  }

    if (!user) return;

    const finalPost = {
      ...postData,
      name: user?.result?.name || user?.result?.firstName,
    };

    if (currentId === 0) {
      dispatch(createPost(finalPost));
    } else {
      dispatch(updatePost(currentId, finalPost));
    }
    clear();
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
<Paper className={classes.paper}>
  <form
    autoComplete="off"
    noValidate
    className={`${classes.root} ${classes.form}`}
    onSubmit={handleSubmit}
  >
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ec407a', marginBottom: '16px' }}>
      {currentId ? `Editing "${post?.title}"` : 'Create a Konvo'}
    </Typography>
    <TextField
      name="title"
      variant="outlined"
      label="Title"
      fullWidth
      value={postData.title}
      onChange={(e) => setPostData({ ...postData, title: e.target.value })}
    />
    <TextField
      name="message"
      variant="outlined"
      label="Message"
      fullWidth
      multiline
      rows={4}
      value={postData.message}
      onChange={(e) => setPostData({ ...postData, message: e.target.value })}
    />
    <TextField
      name="tags"
      variant="outlined"
      label="Tags (comma separated)"
      fullWidth
      value={postData.tags}
      onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
    />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPostData({ ...postData, selectedFile: reader.result });
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      }}
      style={{ margin: '10px 0' }}
    />
    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <Button
  className={classes.buttonSubmit}
  variant="contained"
  size="small"
  type="submit"
  fullWidth
  disabled={
    !postData.title.trim() ||
    !postData.message.trim() ||
    !postData.tags.length ||
    !postData.selectedFile
  }
  sx={{
    backgroundColor: '#f06292',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#ec407a',
    },
  }}
>
  Submit
</Button>

      <Button
        variant="contained"
        size="small"
        onClick={clear}
        fullWidth
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
        Clear
      </Button>
    </div>
  </form>
</Paper>

  );
};

export default Form;
