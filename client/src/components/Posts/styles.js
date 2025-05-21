import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: '8px', // theme.spacing(1)
  },
  actionDiv: {
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  heading: {
  fontFamily: "'Pacifico', cursive",
  fontSize: '2.5rem',
  flexGrow: 1,
  textAlign: 'center',
  color: '#e91e63', // Optional: match the pink theme
},
}));
