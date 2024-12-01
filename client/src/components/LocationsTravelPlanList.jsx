import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTravelPlansLocationId } from '../redux/travelPlans/travelPlansSlice'
import { Card, CardContent, Typography, Box, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

const LocationsTravelPlanList = () => {
    // Getting travel plans based on a location id.
    const travelPlansLocationId = useSelector((state) => state.travelPlans.travelPlansLocationId)
    // Created local state for location and selected location. 
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState(null)
    const dispatch = useDispatch()
    // Fetch all the locations.
    useEffect(() => {
        fetch("/api/locations")
            .then((resp) => resp.json())
            .then(data => setLocations(data))
    }, [])
    // Fetching travel plans for a selected location. 
    useEffect(() => {
        if (selectedLocation) {
            dispatch(fetchTravelPlansLocationId(selectedLocation))
        }
    }, [selectedLocation, dispatch]);
    // When a new location is selected updating state for that location. 
    const handleLocationChange = (event) => {
        const locationId = parseInt(event.target.value)
        setSelectedLocation(locationId || null)
    }
    // Sorting the travel plans for that location so that the latest travel plans appear first. 
    const sortedTravelPlans = travelPlansLocationId.travel_plans ? [...travelPlansLocationId.travel_plans].sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    : []

    return (
        <Box sx={{ padding: 3 }}>
            <div className='locationTravelPlanDiv'>

            <Typography variant="h4" gutterBottom>
                Show the Travel Plans for a selected location:
            </Typography>
            <FormControl sx={{ mb: 3 }}>
                <InputLabel>Select a location</InputLabel>
                <Select
                    value={selectedLocation || ''}
                    onChange={handleLocationChange}
                    label="Select a location"
                    style = {{width: 300}}

                >
                    <MenuItem value="" disabled>Select a location</MenuItem>
                    {locations.map(location => (
                        <MenuItem key={location.id} value={location.id}>
                            {location.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </div>
            {/* Conitionally rendering the travel plans a selected location. If nothing is selected, giving directions to select a location. Once a location is selected showing the travel plans for that location. If a location is selected with no travel plans provide text saying that there is no travel plans for that location.  */}
            {selectedLocation ? (
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Travel Plans for {locations.find(location => location.id === selectedLocation)?.name}
                    </Typography>
                    {sortedTravelPlans && sortedTravelPlans.length > 0 ? (
                    <Grid container spacing={3}>
                        {sortedTravelPlans.map((travelPlanLocationId) => (
                            <Grid item xs={12} sm={6} md={4} key={travelPlanLocationId.id}>
                                <Card sx={{ maxWidth: 600, mb: 3, borderRadius: 2, boxShadow: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                            {travelPlanLocationId.name}
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            {travelPlanLocationId.iframe_src_or_link.includes('google.com') ? (
                                                <iframe
                                                    src={travelPlanLocationId.iframe_src_or_link}
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    width="100%"
                                                    height="300"
                                                    style={{ border: 0, borderRadius: 4 }}
                                                    title="Map"
                                                />
                                            ) : (
                                                <a href={travelPlanLocationId.iframe_src_or_link} target="_blank" rel="noopener noreferrer">
                                                    <Typography variant="body2" color="cyan" sx={{ textDecoration: 'underline' }}>Google Map Link</Typography>
                                                </a>
                                            )}
                                        </Box>

                                        <Typography variant="body1" color="textSecondary">
                                            <strong>Start Date:</strong> {travelPlanLocationId.start_date}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            <strong>End Date:</strong> {travelPlanLocationId.end_date}
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="body1" color="textSecondary"><strong>Travelers:</strong></Typography>
                                            {travelPlanLocationId.users?.map((user, index) => (
                                                <Typography key={index} variant="body2" color="textSecondary">
                                                    {user.name} ({user.username})
                                                </Typography>
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    ):(
                        <Typography variant="body1" color="textSecondary">
                            {locations.find(location => location.id === selectedLocation)?.name} has no current travel plans.
                        </Typography>
                    )}
                </Box>
                ) : (
                    <div className='selectaUserLocation'>
                <Typography variant="body1" color="textSecondary">
                    Please select a location to see its travel plans.
                </Typography>
                </div>

            )}
        </Box>
    )
}

export default LocationsTravelPlanList
