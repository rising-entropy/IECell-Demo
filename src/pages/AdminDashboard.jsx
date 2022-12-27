import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AllUsersTable from '../components/AllUsersTable';

export default function AdminDashboard() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser'))
    const navigate = useNavigate();
    useEffect(()=>{
        if(loggedInUser === "{}"){
            navigate('/login');
        }
        setLoggedInUser(JSON.parse(loggedInUser));
    }, []);

  return (
    <>
    <Container component="main" maxWidth="xl">
        <Typography sx={{mx: 2, my: 4}} align="center" >Hi, {loggedInUser['name']} 😎</Typography>
        <AllUsersTable/>
    </Container>
    
    </>
  )
}
