import React, { useState, useEffect } from 'react'
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { addTravelPlan } from '../redux/travelPlans/travelPlansSlice'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import { styled } from '@mui/system'

//Styling for the background.
const StyledBox = styled(Box)({
  background: 'linear-gradient(to bottom right, #4A90E2, #50E3C2)', 
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  boxSizing: 'border-box',
  borderRadius: '15px', 
})

//Styling for the card that holds the form elements. 
const FeatureCard = styled(Box)({
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '310px',
  width: '100%',
  marginBottom: '15px',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease-in-out',
  },
})

// Styling for steps on adding the iframe. 
const InstructionStep = styled(Box)({
  backgroundColor: '#e0e0e0', 
  borderRadius: '8px',
  padding: '16px',  
  marginBottom: '16px',  
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const TravelPlanForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Creating state for the users. 
  const [users, setUsers] = useState([])
  //Creating the initial values for the the form all as empty based on what data type they are. 
  const initialValues = {
    name: "",
    iframe_src_or_link: "",
    start_date: "",
    end_date: "",
    location_name: "",
    array_of_users_usernames: [],
  }

  // Creating validations for the form data. 
  const validationSchema = yup.object({
    name: yup.string().required("Name is required."),
    iframe_src_or_link: yup.string().required("Provide a link to the map."),
    start_date: yup.date().required("Start date is required."),
    end_date: yup.date().required("End date is required."),
    location_name: yup.string().required("Add a location for this trip."),
    array_of_users_usernames: yup.array().of(
      yup.string().required("Traveler is required.")
    ).min(1, "At least one traveler is required."),
  })
  //Fetching all the users. 
  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data)
    }
    loadUsers()
  }, [])

  return (
    <StyledBox >
      <FeatureCard>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Add a Travel Plan
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // Code for what to do on the form submit. (Takes in the values of form, adds the new travel plan into state, navagates to the all travel plans page,and  resets the form. )
          onSubmit={async (values, { resetForm }) => {
            await dispatch(addTravelPlan(values))
            navigate("/travel_plans")
            resetForm()
          }}
        >
          {({ values, errors, touched, setFieldValue, handleChange }) => (
            <Form>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Name of Travel Plan"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  value={values.name}
                  onChange={handleChange}
                  helperText={<ErrorMessage name="name" />}
                  error={touched.name && Boolean(errors.name)}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Google Maps iframe source or link"
                  name="iframe_src_or_link"
                  variant="outlined"
                  margin="normal"
                  value={values.iframe_src_or_link}
                  onChange={handleChange}
                  helperText={<ErrorMessage name="iframe_src_or_link" />}
                  error={touched.iframe_src_or_link && Boolean(errors.iframe_src_or_link)}
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  <a href="https://www.google.com/maps/d/" target="_blank" rel="noopener noreferrer">
                    Create a map using this link
                  </a>
    
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                See below how to get the iframe source.
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  name="start_date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={values.start_date}
                  onChange={handleChange}
                  margin="normal"
                  helperText={<ErrorMessage name="start_date" />}
                  error={touched.start_date && Boolean(errors.start_date)}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  name="end_date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={values.end_date}
                  onChange={handleChange}
                  margin="normal"
                  helperText={<ErrorMessage name="end_date" />}
                  error={touched.end_date && Boolean(errors.end_date)}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location_name"
                  variant="outlined"
                  value={values.location_name}
                  onChange={handleChange}
                  margin="normal"
                  helperText={<ErrorMessage name="location_name" />}
                  error={touched.location_name && Boolean(errors.location_name)}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Select travelers for this trip
                </Typography>
                <FieldArray
                  name="array_of_users_usernames"
                  // Rendering of adding more travelers and updating the webpage as the button is pressed to show more select drop downs for more travelers. 
                  render={arrayHelpers => (
                    <Box>
                      {values.array_of_users_usernames.map((user, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Select a user</InputLabel>
                            <Field
                              as={Select}
                              label="Select a user"
                              name={`array_of_users_usernames[${index}]`}
                              onChange={(e) => setFieldValue(`array_of_users_usernames[${index}]`, e.target.value)}
                              value={values.array_of_users_usernames[index]}
                            >
                              <MenuItem value="" disabled>Select user</MenuItem>
                              {users.length > 0 ? (
                                users.map(userOption => (
                                  <MenuItem key={userOption.username} value={userOption.username}>
                                    {userOption.name} : {userOption.username}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem value="" disabled>No users available</MenuItem>
                              )}
                            </Field>
                            <FormHelperText error>
                              <ErrorMessage name={`array_of_users_usernames[${index}]`} />
                            </FormHelperText>
                          </FormControl>
                          {/* Once the user clicks to add a traveler they can then change there mind if there are less travelers than original thought and remove an input field. */}
                          <Button
                            type="button"
                            variant="outlined"
                            color="error"
                            sx={{ ml: 2 }}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove
                          </Button>
                        </Box>
                      ))}
                      {/* Button to add additional travelers to a trip. */}
                      <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add Traveler
                      </Button>
                    </Box>
                  )}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                {/* Button to submit the new travel plan. */}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Add Travel Plan
                </Button>
              </Box>
              {/* Steps below for addiing the iframe. */}
              <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    How to add the iframe:
                  </Typography>

                  <InstructionStep>
                    <Typography variant="body1">
                      1. Once your map is created, make sure all items under "share" are checked.
                    </Typography>
                  </InstructionStep>

                  <InstructionStep>
                    <Typography variant="body1">
                      2. Go to the same card and click on the 3 dots in the top right corner.
                    </Typography>
                  </InstructionStep>

                  <InstructionStep>
                    <Typography variant="body1">
                      3. Click on "Embed on my site".
                    </Typography>
                  </InstructionStep>

                  <InstructionStep>
                    <Typography variant="body1">
                      4. Copy and paste the <code>src</code> without quotes into the form location. Example below:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      https://www.google.com/maps/d/embe d?mid=1LYAG9uDZbzRLc-uriAsEUYoquuDDbzQ&ehbc=2E3
                    </Typography>
                  </InstructionStep>
                </Box>
            </Form>
          )}
        </Formik>
      </FeatureCard>
    </StyledBox>
  )
}

export default TravelPlanForm
