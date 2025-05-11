import { Container, TextField, Button, Paper } from '@mui/material';

export default function Form() {
  return (
    <Container
      sx={{
        '& .MuiTextField-root': {
          margin: 1, // theme.spacing(1)
        },
      }}
    >
      <Paper sx={{ padding: 2 }}>
        <form
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Text Field"
            sx={{ margin: '10px 0', width: '97%' }}
          />
          <Button variant="contained" sx={{ marginBottom: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
