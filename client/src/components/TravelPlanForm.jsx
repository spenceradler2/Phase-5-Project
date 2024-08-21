import React, { useState, useEffect } from 'react'
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { addTravelPlan } from '../redux/travelPlans/travelPlansSlice'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, CircularProgress } from '@mui/material';

const TravelPlanForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [users, setUsers] = useState([])


  const initialValues = {
    name: "",
    iframe_src_or_link: "",
    start_date: "",
    end_date: "",
    location_name: "",
    array_of_users_usernames: [], 
  }

  const validationSchema = yup.object({
    name: yup.string().required("Name is required."),
    iframe_src_or_link: yup.string().required("Provide a link to the map."),
    start_date: yup.date().required("Start date is required."),
    end_date: yup.date().required("End date is required."),
    location_name: yup.string().required("Add a location for this trip."),
    array_of_users_usernames: yup.array().of(yup.string().required("Traveler is required.")).min(1, "At least one traveler is required."),
  })

  useEffect(() => {
    const loadUsers = async () => {
        const response = await fetch("/api/users")
        const data = await response.json()
        setUsers(data)
    }
    loadUsers()
  }, [])

  return (
    <div className='Form'>
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add a Travel Plan
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await dispatch(addTravelPlan(values))
          navigate("/travel_plans")
          resetForm()
        }}
      >
        {({ values, errors, touched, setFieldValue, handleChange }) => (
          <Form>
            <Box sx={{ mb: 1 }}>
              <TextField
                style = {{width: 300}}
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

            <Box sx={{ mb: 1 }}>
              <TextField
                style = {{width: 300}}
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
                <a href="https://www.google.com/maps/d/" target="_blank" rel="noopener noreferrer">Create a map using this link</a>
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                See below how to get the iframe source.
              </Typography>
            </Box>

            <Box sx={{ mb: 1 }}>
              <TextField
                style = {{width: 300}}
                type="date"
                label="Start Date"
                name="start_date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={values.state_date}
                onChange={handleChange}
                margin="normal"
                helperText={<ErrorMessage name="start_date" />}
                error={touched.start_date && Boolean(errors.start_date)}
              />
            </Box>

            <Box sx={{ mb: 1 }}>
              <TextField
                style = {{width: 300}}
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

            <Box sx={{ mb: 1 }}>
              <TextField
                style = {{width: 300}}
                label="Location"
                name="location_name"
                variant="outlined"
                value={values.location_name}
                onChange={handleChange}
                margin="normal"
                helperText={<ErrorMessage name="location_name" />}
                error={touched.location_name && Boolean(errors.location_name)}
              />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}                 style = {{width: 300}}
              >
                Location input format to be City, State or City, Country. Case matters. Example: New York, New York or East Hampton, New York or Madrid, Spain.
              </Typography>
            </Box>

            <Box sx={{ mb: 1 }}>
              <Typography variant="h6" gutterBottom>
                Select travelers for this trip
              </Typography>
              <FieldArray
                name="array_of_users_usernames"
                render={arrayHelpers => (
                  <Box>
                    {values.array_of_users_usernames.map((user, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <FormControl  variant="outlined">
                          <InputLabel>Select a user</InputLabel>
                          <Field
                            style = {{width: 200}}
                            inputStyle = {{textAlign: 'center'}}
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
                          <FormHelperText>
                            <ErrorMessage name={`array_of_users_usernames[${index}]`} />
                          </FormHelperText>
                        </FormControl>
                        <Button
                          type="button"
                          variant="outlined"
                          color="error"
                          sx={{ ml: 1 }}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add Traveler
                    </Button>
                  </Box>
                )}
              />
            </Box>

            <Button type="submit" variant="contained" color="primary">
              Add Travel Plan
            </Button>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom style = {{width: 300}}
              >
                How to add the iframe:
              </Typography > 
              <ol style = {{width: 300}} >
                <li>Once your map is created make sure all items under share are checked.</li>
                <li>Go to the same card and click on the 3 dots in the top right corner.</li>
                <li>Go to "Embed on my site".</li>
                <li>Copy and paste src without the quotes into the form location. See example below:</li>
                <li>https://www.google.com/maps/d/embed?mid=1LYAG9uDZbzRLc-uriAsEUYoquuDDbzQ&ehbc=2E3</li>
              </ol>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
    </div>
  )
}

export default TravelPlanForm
