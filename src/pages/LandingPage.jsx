import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { checkOrCreateData } from '../utils'

export default function LandingPage() {

  return (
    <div style={{margin: '1rem auto', textAlign: 'center'}} >
        <h2>Landing Page</h2>
        <div style={{margin: '2rem auto'}}>
            <p>2 Modes:</p>
            <p>
                User<br/>
                Admin
            </p>
        </div>
        <div style={{margin: '1rem auto'}}>
            <Link style={{textDecoration: 'none'}} to={"/login"}><Button variant="contained" style={{margin: 'auto 1rem'}}>Login</Button></Link>
            <Link style={{textDecoration: 'none'}} to={"/register"}><Button variant="outlined" style={{margin: 'auto 1rem'}}>Sign Up</Button></Link>
        </div>
        
    </div>
  )
}
