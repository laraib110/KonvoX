import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';  // Updated import
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField 
          name="creator" 
          variant="outlined" 
          label="Creator" 
          fullWidth 
          value={postData.creator} 
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
          sx={{ margin: 1 }} 
        />
        <TextField 
          name="title" 
          variant="outlined" 
          label="Title" 
          fullWidth 
          value={postData.title} 
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          sx={{ margin: 1 }} 
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
          sx={{ margin: 1 }} 
        />
        <TextField 
          name="tags" 
          variant="outlined" 
          label="Tags (comma separated)" 
          fullWidth 
          value={postData.tags} 
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
          sx={{ margin: 1 }} 
        />
        <div sx={{ margin: '10px 0' }}>
          <FileBase 
            type="file" 
            multiple={false} 
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} 
          />
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          type="submit" 
          fullWidth 
          sx={{ marginBottom: 2 }}
        >
          Submit
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          onClick={clear} 
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
