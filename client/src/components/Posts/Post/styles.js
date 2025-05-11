import { styled } from '@mui/material/styles';
import { Card, CardMedia, Typography, CardActions } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '15px',
  height: '100%',
  position: 'relative',
}));

export const StyledMedia = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '56.25%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backgroundBlendMode: 'darken',
}));

export const Overlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  left: '20px',
  color: 'white',
}));

export const Overlay2 = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  color: 'white',
}));

export const Details = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px',
}));

export const Title = styled(Typography)(({ theme }) => ({
  padding: '0 16px',
}));

export const CardActionsContainer = styled(CardActions)(({ theme }) => ({
  padding: '0 16px 8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
}));
