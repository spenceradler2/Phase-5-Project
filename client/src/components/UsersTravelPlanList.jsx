import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTravelPlansUserId } from '../redux/travelPlans/travelPlansSlice'
import { Card, CardContent, Typography, Box, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

const UsersTravelPlanList = () => {
    // Getting travel plans based on a user id.

    const travelPlansUserId = useSelector((state) => state.travelPlans.travelPlansUserId)
    // Created local state for users and selected user. 

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const dispatch = useDispatch()
    // Fetch all the users.

    useEffect(() => {
        fetch("/api/users")
            .then((resp) => resp.json())
            .then(data => setUsers(data))
    }, []);
    // Fetching travel plans for a selected user. 

    useEffect(() => {
        if (selectedUser) {
            dispatch(fetchTravelPlansUserId(selectedUser))
        }
    }, [selectedUser, dispatch]);
    // When a new user is selected updating state for that user. 

    const handleUserChange = (event) => {
        const userId = parseInt(event.target.value)
        setSelectedUser(userId || null)
    };
    // Sorting the travel plans for that user so that the latest travel plans appear first. 

    const sortedTravelPlans = travelPlansUserId.travel_plans ? [...travelPlansUserId.travel_plans].sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    : []

    return (
        <Box sx={{ padding: 3 }}>
            <div className='userTravelPlanDiv'>
                <Typography variant="h4" gutterBottom>
                    Show the Travel Plans of one of the users below:
                </Typography>
                <FormControl sx={{ mb: 3 }} variant="outlined">
                    <InputLabel>Select a user</InputLabel>
                    <Select
                        value={selectedUser || ''}
                        onChange={handleUserChange}
                        margin="normal"
                        label="Select a user"
                        inputProps={{ 'aria-label': 'Select a user' }}
                        style = {{width: 300}}
                    >
                        <MenuItem value="" >Select a user</MenuItem>
                        {users.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}: {user.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {/* Conitionally rendering the travel plans a selected user. If nothing is selected, giving directions to select a user. Once a user is selected showing the travel plans for that user. If a user is selected with no travel plans provide text saying that there is no travel plans for that user.  */}

            {selectedUser ? (
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Travel Plans for {users.find(user => user.id === selectedUser)?.name}
                    </Typography>
                    {sortedTravelPlans && sortedTravelPlans.length > 0 ? (
                        <Grid container spacing={3}>
                            {sortedTravelPlans.map((travelPlanUserId) => (
                                <Grid item xs={12} sm={6} md={4} key={travelPlanUserId.id}>
                                    <Card sx={{ maxWidth: 600, mb: 3, borderRadius: 2, boxShadow: 3 }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                                {travelPlanUserId.name}
                                            </Typography>
                                            <Box sx={{ mb: 2 }}>
                                                {travelPlanUserId.iframe_src_or_link.includes('google.com') ? (
                                                    <iframe
                                                        src={travelPlanUserId.iframe_src_or_link}
                                                        referrerPolicy="no-referrer-when-downgrade"
                                                        width="100%"
                                                        height="300"
                                                        style={{ border: 0, borderRadius: 4 }}
                                                        title="Map"
                                                    />
                                                ) : (
                                                    <a href={travelPlanUserId.iframe_src_or_link} target="_blank" rel="noopener noreferrer">
                                                        <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline' }}>Google Map Link</Typography>
                                                    </a>
                                                )}
                                            </Box>
                                            <Typography variant="body1" color="textSecondary">
                                                <strong>Travel Destination:</strong> {travelPlanUserId.location?.name}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary">
                                                <strong>Start Date:</strong> {travelPlanUserId.start_date}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary">
                                                <strong>End Date:</strong> {travelPlanUserId.end_date}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            {users.find(user => user.id === selectedUser)?.name} has no travel plans currently.
                        </Typography>
                    )}
                </Box>
            ) : (
                <div className='selectaUserLocation'>
                <Typography variant="body1" color="textSecondary">
                    Please select a user to see their travel plans.
                </Typography>
                </div>
            )}
        </Box>
    )
}

export default UsersTravelPlanList
