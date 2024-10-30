import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export default function Signup() {
  const email = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();

    if (username.current.value && email.current.value && password.current.value) {
      try {
        // Send signup data to the backend
        const response = await axios.post('http://localhost:5000/signup', {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value
        });

        alert(response.data.message); // Show success message
        navigate('/login'); // Redirect to login page

      } catch (error) {
        console.error('Error during signup:', error);
        setErrorMessage('Failed to create account. Please try again.');
      }
    } else {
      setErrorMessage('All fields are required');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              placeholder="Name"
              autoFocus
              inputRef={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              placeholder="Email"
              inputRef={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="Password"
              inputRef={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Sign Up
            </Button>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
