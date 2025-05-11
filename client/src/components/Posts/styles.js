import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const ContainerGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  // Add other container-level styles here if needed
}));
