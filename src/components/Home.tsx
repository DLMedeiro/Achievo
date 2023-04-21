import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import HeroImage from '../images/HeroImage.jpg'

export default function Home() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: '78px 0',
        height: '90vh',
        display: 'flex',
        // flexDirection: 'column', -> not needed?
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid item xs={5} sx={{ fontSize: '2rem' }}>
        <h1>Welcome to Boredly</h1>
        <p>Your boredom ends here!</p>

        <Link to="login" style={{ textDecoration: 'none', margin: '1rem' }}>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: '40px',
              margin: '0 auto',
            }}
          >
            Log In
          </Button>
        </Link>
        <Link to="demo" style={{ textDecoration: 'none', margin: '1rem' }}>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: '40px',
              margin: '0 auto',
            }}
          >
            Try out a demo
          </Button>
        </Link>
      </Grid>
      <Grid item xs={7}>
        <img src={HeroImage} alt="bored dog" style={{ width: '100%' }}></img>
      </Grid>
    </Grid>
  )
}
