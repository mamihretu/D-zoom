import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getCookie from '../utils/Csrf'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function Login() {
      const [username, setUserName] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();

      function loadUserName(event){
        setUserName(event.target.value);
      }

      function loadPassword(event){
        setPassword(event.target.value);
      }      


      async function handleSubmit(event) {
          var csrftoken = getCookie('csrftoken');
          const requestOptions = {
            credentials: 'include',
            method: 'POST',
            mode: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          };

          try{
              const response = await fetch('/rest-auth/login/', requestOptions);
              
              if(response.ok){
                navigate('/');
              }
          }catch{
            alert("Try again");
          }
        }

        return (
          <ThemeProvider theme={theme}>
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
                  Sign in
                </Typography>
                <Box  noValidate sx={{ mt: 1 }}>
                  <TextField
                    onChange={loadUserName}
                    margin="normal"
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    name="Username"
                    autoComplete="Username"
                    autoFocus
                  />
                  <TextField
                    onChange={loadPassword}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        );
}