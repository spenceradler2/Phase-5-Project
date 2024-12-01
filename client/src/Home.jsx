import { Box, Container, Typography, Grow, Slide } from '@mui/material'
import { styled } from '@mui/system'

const StyledContainer = styled(Container)(({
  background: 'linear-gradient(to bottom right, #4A90E2, #50E3C2)', 
  minHeight: '50%', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center', 
  padding: '20px', 
  borderRadius: '15px', 
  boxSizing: 'border-box', 
  paddingTop: '65px',
  marginBottom: '5px',
  margin: 0, 
  width: '100vw', 
  position: 'relative', 
  top: 6,
  overflow: 'hidden', 
}))

const FeatureCard = styled(Box)(({
  backgroundColor: 'white',
  padding: '15px 20px',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '15px',
  maxWidth: '500px', 
  width: '95%',
}))

const Home = () => {
  return (
    <Box sx={{ height: '90vh', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <StyledContainer maxWidth="lg">
        <Box sx={{ textAlign: 'center', marginTop: { xs: '20px', sm: '8px' }, width: '100%' }}>
          {/* Grow animation for "Welcome" text */}
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
          {/* "Welcome" text */}
            <Typography
              variant="h2"
              color="primary"
              sx={{
                textShadow: '.5px .5px 0px black, -.5px -.5px 0px black, .5px -.5px 0px black, -.5px .5px 0px black',
                paddingLeft: { xs: '0', sm: '90px' },
                fontSize: { xs: '1.7rem', sm: '2.3rem', md: '3rem' },
              }}
              gutterBottom
            >
              Welcome to TravelPlan!
            </Typography>
          </Grow>

          {/* Slide animation for "About" */}
          <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1400}>
            <Box sx={{ marginY: 1 }}>
              {/* About title */}
              <Typography
                variant="h6"
                color="textPrimary"
                sx={{
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  paddingLeft: { xs: '0', sm: '90px' }, 
                }}
              >
                About:
              </Typography>
            </Box>
          </Slide>

          {/* Slide animation for the "About" text */}
          <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1200}>
            <Box sx={{ marginY: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}> 
              {/* About text */}
              <Typography
                variant="h5"
                color="textSecondary"
                sx={{
                  maxWidth: '700px',
                  alignItems: 'center',
                  fontSize: { xs: '.8rem', sm: '1rem'},
                  paddingLeft: { xs: '0', sm: '90px' }, 
                }}
              >
                This is a website where you can share your travel plans and see where friends are going and what they are doing in that location!
              </Typography>
            </Box>
          </Slide>

          {/* Slide animation for "Feature title" */}
          <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1400}>
            <Box sx={{ marginY: 1 }}>
              {/* "Feature title" */}
              <Typography
                variant="h6"
                color="textPrimary"
                sx={{
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  paddingLeft: { xs: '0', sm: '90px' }, 
                }}
              >
                Features:
              </Typography>
            </Box>
          </Slide>

          {/* Feature cards animation */}
          <Box sx={{ marginY: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingLeft: { xs: '0', sm: '90px' } }}> 
            {/* First Feature Card */}
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1600}>
              <FeatureCard sx={{ marginX: { xs: '10px', sm: '15px' } }}>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  sx={{ fontSize: { xs: '.9rem', sm: '1.1rem' } }}
                >
                  Feature 1
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '.9rem' } }}
                >
                  You can see a list of all the travel plans, who is going there, and where they are going.
                </Typography>
              </FeatureCard>
            </Slide>

            {/* Second Feature Card */}
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1800}>
              <FeatureCard sx={{ marginX: { xs: '10px', sm: '15px' } }}>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  sx={{ fontSize: { xs: '.9rem', sm: '1.1rem' } }}
                >
                  Feature 2
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '.9rem' } }}
                >
                  You can delete, update, and add a new travel plan to the website.
                </Typography>
              </FeatureCard>
            </Slide>

            {/* Third Feature Card */}
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={2000}>
              <FeatureCard sx={{ marginX: { xs: '10px', sm: '15px' } }}>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  sx={{ fontSize: { xs: '.9rem', sm: '1.1rem' } }}
                >
                  Feature 3
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '.9rem' } }}
                >
                  You can see all the travel plans that one of your friends has.
                </Typography>
              </FeatureCard>
            </Slide>

            {/* Fourth Feature Card */}
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={2200}>
              <FeatureCard sx={{ marginX: { xs: '10px', sm: '15px' } }}>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  sx={{ fontSize: { xs: '.9rem', sm: '1.1rem' } }}
                >
                  Feature 4
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '.9rem' } }}
                >
                  You can see all the travel plans for a specific location.
                </Typography>
              </FeatureCard>
            </Slide>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  )
}

export default Home
