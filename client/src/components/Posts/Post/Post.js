import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import {
  StyledCard,
  StyledMedia,
  Overlay,
  Overlay2,
  Details,
  Title,
  CardActionsContainer,
} from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <StyledCard>
      <StyledMedia
        image={
          post.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={post.title}
      />
      <Overlay>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </Overlay>
      <Overlay2>
        <Button size="small" onClick={() => setCurrentId(post._id)} sx={{ color: 'white' }}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </Overlay2>
      <Details>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </Details>
      <Title gutterBottom variant="h5" component="h2">
        {post.title}
      </Title>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActionsContainer>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActionsContainer>
    </StyledCard>
  );
};

export default Post;
