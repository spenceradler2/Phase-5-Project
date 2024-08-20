// Home.js
import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import { Slide, Grow } from '@mui/material'

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', marginTop: 8 }}>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          timeout={1000}
        >
          <Typography variant="h2" color="primary" gutterBottom>
            Welcome to TravelPlan!
          </Typography>
        </Grow>

        <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1200}>
          <Box sx={{ marginY: 4 }}>
            <Typography variant="h5" color="textSecondary">
              About: This is a website where you can share your travel plans and see where friends are going and what they are doing in that location!
            </Typography>
          </Box>
        </Slide>
        
        <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1400}>
          <Box sx={{ marginY: 2 }}>
            <Typography style={{ textAlign: 'left',}} variant="h6" color="textPrimary">
              Features:
            </Typography>
          </Box>
        </Slide>
        
        <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1600}>
          <Box sx={{ marginY: 1 }}>
            <ul style={{ textAlign: 'left', listStyleType: 'disc', margin: '0 auto', padding: 0, maxWidth: 600 }}>
              <li>You can see a list of all the travel plans, who is going there and where they are going.</li>
              <li>You can delete, update, and add a new travel plan to the website.</li>
              <li>You can see all the travel plans that one of your friends has.</li>
              <li>You can see all the travel plans for specific location.</li>

            </ul>
          </Box>
        </Slide>
      </Box>
    </Container>
  )
}

export default Home
