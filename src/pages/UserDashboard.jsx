import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserDashboard() {
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser'))
    const navigate = useNavigate();
    useEffect(()=>{
        if(loggedInUser === "{}"){
            navigate('/login');
        }
        setLoggedInUser(JSON.parse(loggedInUser));
    }, []);

  return (
    <Container component="main" maxWidth="xs">
        <Typography sx={{mx: 2}} align="center" >Hi, {loggedInUser['name']} 😄</Typography>
    </Container>
  )
}
