import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import HeroImage from '../images/HeroImage.jpg'

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh', paddingTop: ' 5rem' }}>
        <h1>Welcome to Boredly</h1>
        <h2>Your boredom ends here!</h2>
        <img src={HeroImage} alt="bored dog"></img>
      </Box>
    </Container>
  )
}
