import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUser } from '../utils';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function Login() {

    const [thePassword, setThePassword] = useState("")
   const [theUsername, setTheUsername] = useState("")
   const [error, setError] = useState("")

   const navigate = useNavigate();

   const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser'))
    useEffect(()=>{
        if(loggedInUser !== "{}"){
            navigate('/login');
            const theUser = JSON.parse(loggedInUser);
            setLoggedInUser(JSON.parse(loggedInUser))
            if(theUser['role'] === 'admin'){
                navigate('/admin')
            }else{
                navigate('/user')
            }
        }
    }, []);


    const submitForm = e => {
      e.preventDefault();
      setError("");
      if(theUsername.length === 0){
        setError("Username is Required");
        return;
      }
      if(thePassword.length === 0){
        setError("Password is Required");
        return;
      }
      const body = {
        username: theUsername,
        password: thePassword
      }
      const resp = loginUser(body)
      if(resp['status'] === 401){
        setError(resp['message'])
      }else{
        if(resp['role'] === 'admin'){
            navigate("/admin");
        }else{
            navigate("/user");
        }
      }
  };


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
          <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
            {error.length > 0 ? <Alert severity="error" sx={{ m: 2 }}>{error}</Alert> : <></>}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setTheUsername(e.target.value)} value={theUsername}          
              />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setThePassword(e.target.value)} value={thePassword}   
              />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <p style={{textAlign: "center"}} >Don&apos;t have an account? <span><Link style={{cursor: "pointer"}} to="/register">Sign Up</Link></span>.</p>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
