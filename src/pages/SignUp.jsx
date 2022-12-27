import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerUser } from '../utils';
import { Alert } from '@mui/material';


const theme = createTheme();

export default function SignUp() {

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

    const [thePassword, setThePassword] = useState("")
   const [theUsername, setTheUsername] = useState("")
   const [theName, setTheName] = useState("")
   const [error, setError] = useState("")

   const navigate = useNavigate();

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
      if(theName.length === 0){
        setError("Name is Required");
        return;
      }
      const body = {
        name: theName,
        username: theUsername,
        password: thePassword
      };
      const resp = registerUser(body);
      if(resp['status'] === 401){
        setError(resp['message'])
      }else{
        navigate("/user");
      }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
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
              onChange={(e)=>setTheUsername(e.target.value)} 
              value={theUsername}          
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="name"
              id="name"
              onChange={(e)=>setTheName(e.target.value)} value={theName}   
              />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              value="Signup"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <p style={{textAlign: "center"}} >Already have an account? <span><Link style={{cursor: "pointer"}} to="/login">Login</Link></span>.</p>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  )
}
