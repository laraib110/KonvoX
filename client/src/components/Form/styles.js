import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      margin: '8px', // theme.spacing(1)
    },
  },
  paper: {
    padding: '16px',
    maxWidth: '800px',  // Restricting the width of the form
    margin: 'auto', // Center align
    borderRadius: '16px', // theme.spacing(2)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',  // Adjust form layout
    gap: '10px',
    alignItems: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: '10px',
  },
}));
