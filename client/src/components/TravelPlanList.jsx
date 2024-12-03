import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTravelPlans, deleteTravelPlan } from '../redux/travelPlans/travelPlansSlice'
import TravelPlanCard from './TravelPlanCard'
import { Grid, Typography, CircularProgress, Box, Button } from '@mui/material'

const TravelPlanList = () => {
  const dispatch = useDispatch()
  // Getting all travel plans. 
  const travelPlans = useSelector((state) => state.travelPlans.travelPlans)
  // If it is in the process of fetching. 
  const status = useSelector((state) => state.travelPlans.status)
  // If the fetch failed. 
  const error = useSelector((state) => state.travelPlans.error)
  // State for which type of travel plans are being looked at. All, current, previous or upcoming.  

  const [view, setView] = useState('all') 
  // Fetch for getting all the travel plans with redux. 
  useEffect(() => {
    dispatch(fetchTravelPlans())
  }, [dispatch])
  // Function to handle the deletion of a travel plan. 
  const handleDeletePlan = (id) => {
    dispatch(deleteTravelPlan(id))
  }
  // Handling the selecting of a new button to change which type of travel plan wants to be seen. 
  const handleViewChange = (newView) => {
    setView(newView)
  }
  //Converting the date into values to sort and compare. 
  const parseDate = (dateString) => new Date(dateString)
  //Sorting the travel plans. 
  const sortedTravelPlans = [...travelPlans].sort((b, a) => parseDate(a.start_date) - parseDate(b.start_date))
  // filtering what travel plans to show based on the selection of the buttons. 
  const filterTravelPlans = () => {
    // Today's date. 
    const now = new Date()
    //If the button of all travel plans is clicked filter to show all the travel plans. 
    if (view === 'all') {
      return sortedTravelPlans 
    }
    //If the button of current travel plans is clicked filter to show all the travel plans that are currently happening. 

    if (view === 'current') {
      return sortedTravelPlans.filter(travelPlan => {
        const startDate = parseDate(travelPlan.start_date)
        const endDate = parseDate(travelPlan.end_date)
        return startDate <= now && endDate >= now
      })
    }
    //If the button of upcoming travel plans is clicked filter to show all the travel plans that are after the current date. 

    return sortedTravelPlans.filter(travelPlan => {
      const endDate = parseDate(travelPlan.end_date)
      return view === 'upcoming' ? endDate >= now : endDate < now
    })
  }
  //If the fetch is in process show a loading icon.
  if (status === 'loading') {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>
  }
  //If the fetch is in failed show a text that the fetch failed.

  if (status === 'failed') {
    return <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>Error: {error}</Typography>
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        See all the travel plans below:
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button
          variant={view === 'all' ? 'contained' : 'outlined'}
          onClick={() => handleViewChange('all')}
          sx={{ mr: 1, marginY: .5 }}
        >
          All Travel Plans
        </Button>
        <Button
          variant={view === 'previous' ? 'contained' : 'outlined'}
          onClick={() => handleViewChange('previous')}
          sx={{ mr: 1, marginY: .5 }}

        >
          Previous Travel Plans 
        </Button>

        <Button
          variant={view === 'current' ? 'contained' : 'outlined'}
          onClick={() => handleViewChange('current')}
          sx={{ mr: 1, marginY: .5 }}
        >
           Current Travel Plans
        </Button>
        <Button
          variant={view === 'upcoming' ? 'contained' : 'outlined'}
          onClick={() => handleViewChange('upcoming')}
          sx={{ mr: 1, marginY: .5 }}
        >
          Upcoming Travel Plans
        </Button>
        
      </Box>
      {/* Rending the travel plans to the page if the travel plans are greater than 0 for that selection. */}
      <Grid container spacing={3}>
        {filterTravelPlans().length > 0 ? (
          filterTravelPlans().map(travelPlan => (
            <Grid item xs={12} sm={6} md={4} key={travelPlan.id}>
              <TravelPlanCard
                travelPlan={travelPlan}
                deleteTravelPlan={() => handleDeletePlan(travelPlan.id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ paddingLeft: '10px', textAlign: 'center' }}>No travel plans available.</Typography>
        )}
      </Grid>
    </Box>
  )
}

export default TravelPlanList
