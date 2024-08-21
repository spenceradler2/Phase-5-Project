import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTravelPlansUserId } from '../redux/travelPlans/travelPlansSlice'
import { Card, CardContent, Typography, Box, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

const UsersTravelPlanList = () => {
    const travelPlansUserId = useSelector((state) => state.travelPlans.travelPlansUserId)

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch("/api/users")
            .then((resp) => resp.json())
            .then(data => setUsers(data))
    }, []);

    useEffect(() => {
        if (selectedUser) {
            dispatch(fetchTravelPlansUserId(selectedUser))
        }
    }, [selectedUser, dispatch]);

    const handleUserChange = (event) => {
        const userId = parseInt(event.target.value)
        setSelectedUser(userId || null)
    };

    return (
        <Box sx={{ padding: 3 }}>
            <div className='userTravelPlanDiv'>
                <Typography variant="h4" gutterBottom>
                    Show the Travel Plans of one of the users below:
                </Typography>
                <FormControl sx={{ mb: 3 }}>
                    <InputLabel>Select a user</InputLabel>
                    <Select
                        value={selectedUser || ''}
                        onChange={handleUserChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Select a user' }}
                    >
                        <MenuItem value="" disabled>Select a user</MenuItem>
                        {users.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}: {user.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {selectedUser ? (
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Travel Plans for {users.find(user => user.id === selectedUser)?.name}
                    </Typography>
                    {travelPlansUserId.travel_plans && travelPlansUserId.travel_plans.length > 0 ? (
                        <Grid container spacing={3}>
                            {travelPlansUserId.travel_plans.map((travelPlanUserId) => (
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
                                            {/* <Typography variant="body1" color="textSecondary">
                                                <strong>Traveler(s):</strong>
                                            </Typography>
                                            {travelPlanUserId.users?.map((user, index) => (
                                                <Typography key={index} variant="body2" color="textSecondary">
                                                    {user.name} ({user.username})
                                                </Typography>
                                            ))} */}
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
