// TravelPlanList.js
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTravelPlans, deleteTravelPlan } from '../redux/travelPlans/travelPlansSlice'
import TravelPlanCard from './TravelPlanCard'
import { Grid, Typography, CircularProgress, Box } from '@mui/material'

const TravelPlanList = () => {
  const dispatch = useDispatch()
  const travelPlans = useSelector((state) => state.travelPlans.travelPlans)
  const status = useSelector((state) => state.travelPlans.status)
  const error = useSelector((state) => state.travelPlans.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTravelPlans())
    }
  }, [dispatch, status])

  const handleDeletePlan = (id) => {
    dispatch(deleteTravelPlan(id))
  };

  if (status === 'loading') {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>
  }

  if (status === 'failed') {
    return <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>Error: {error}</Typography>
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        See all the travel plans below:
      </Typography>
      <Grid container spacing={3}>
        {travelPlans.map(travelPlan => (
          <Grid item xs={12} sm={6} md={4} key={travelPlan.id}>
            <TravelPlanCard
              travelPlan={travelPlan}
              deleteTravelPlan={() => handleDeletePlan(travelPlan.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TravelPlanList
