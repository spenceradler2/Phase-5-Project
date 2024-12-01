import React from 'react'
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

const TravelPlanCard = ({ travelPlan, deleteTravelPlan }) => {
  return (
    <Card sx={{ maxWidth: 2000, marginBottom: 3, borderRadius: 2, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          {travelPlan.name}
        </Typography>

        <Box sx={{ mb: 2 }}>
          {/* Logic to show either the iframe link or a google maps depending what the travel plan contains. */}
          {travelPlan.iframe_src_or_link.includes('google.com') ? (
            <iframe
              src={travelPlan.iframe_src_or_link}
              referrerPolicy="no-referrer-when-downgrade"
              width="100%"
              height="400" 
              style={{ border: 0, borderRadius: 4 }}
              title="Map"
            />
          ) : (
            <a href={travelPlan.iframe_src_or_link} target="_blank" rel="noopener noreferrer">
              <Typography variant="body1" color="primary" sx={{ textDecoration: 'underline' }}>Google Map Link</Typography>
            </a>
          )}
        </Box>
        <Typography variant="body1" color="textSecondary">
          <strong>Travel Destination:</strong> {travelPlan.location.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" >
          <strong>Start Date:</strong> {travelPlan.start_date}
        </Typography>
        <Typography variant="body1" color="textSecondary" >
          <strong>End Date:</strong> {travelPlan.end_date}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {/* Displays the travelers or traveler for that travel plan */}
          <Typography variant="body1" color="textSecondary"><strong>Traveler(s):</strong></Typography>
          {travelPlan.users?.map((user, index) => (
              <Typography key={index} variant="body2" color="textSecondary">
                  {user.name} ({user.username})
              </Typography>
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={deleteTravelPlan}>Delete Travel Plan</Button>
        <Button size="small" component={Link} to={`/travel_plans/${travelPlan.id}/edit`}>Update Travel Plan</Button>
      </CardActions>
    </Card>
  )
}

export default TravelPlanCard
