import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { updateTravelPlan } from '../redux/travelPlans/travelPlansSlice'
import {Box, Typography, TextField, Button, Link} from '@mui/material'
import { styled } from '@mui/system'

// Styling for the background
const StyledBox = styled(Box)({
  background: 'linear-gradient(to bottom right, #4A90E2, #50E3C2)', 
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  boxSizing: 'border-box',
})
//Styling for the form card 
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

const EditTravelPlanForm = () => {
  // Getting the travel plans. 
  const travelPlans = useSelector((state) => state.travelPlans.travelPlans)
  // Setting the id to the id of the travel plan that was selected. 
  const { id } = useParams()
  // Settign the travel plan to the one that was selected. 
  const travelPlan = travelPlans.find((plan) => plan.id === parseInt(id))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Showing the information that the travel plan already had. 
  const initialValues = {
    name: travelPlan.name,
    iframe_src_or_link: travelPlan.iframe_src_or_link,
    start_date: travelPlan.start_date,
    end_date: travelPlan.end_date,
  }
  // Validations for submitting the edited travel plan
  const validationSchema = yup.object({
    name: yup.string().required('Name is required.'),
    iframe_src_or_link: yup.string().required('Provide a link to the map.'),
    start_date: yup.date().required('Start date is required.'),
    end_date: yup.date().required('End date is required.'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
      // Code for what to do on the form submit. (Takes in the values of form and the id of that travel plan, updates the updated travel plan into state, and navagates to the all travel plans page. )
      onSubmit: async (values) => {
      await dispatch(updateTravelPlan({ id: parseInt(id), values }))
      navigate('/travel_plans')
    },
  })

  return (
    <StyledBox>
      <FeatureCard>
        <Typography variant="h4" gutterBottom align="center">
          Edit {travelPlan.name}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Name of Travel Plan"
              variant="outlined"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Provide iframe source or link to Google Maps map"
              variant="outlined"
              name="iframe_src_or_link"
              id="iframe_src_or_link"
              value={formik.values.iframe_src_or_link}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.iframe_src_or_link)}
              helperText={formik.errors.iframe_src_or_link}
            />
            <Box sx={{ mt: 1 }}>
              <Link href="https://www.google.com/maps/d/" target="_blank" rel="noopener noreferrer">
                Create a map using this link
              </Link>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                See below how to get the iframe source.
                </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Start Date"
              variant="outlined"
              type="date"
              name="start_date"
              id="start_date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.start_date}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.start_date)}
              helperText={formik.errors.start_date}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="End Date"
              variant="outlined"
              type="date"
              name="end_date"
              id="end_date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.end_date}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.end_date)}
              helperText={formik.errors.end_date}
            />
          </Box>
            {/* Button to submit the updated travel plan. */}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Travel Plan
          </Button>
          
          {/* Steps below for addiing the iframe. */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">How to add the iframe:</Typography>

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
                3. Click on "Embed on my site."
              </Typography>
            </InstructionStep>

            <InstructionStep>
              <Typography variant="body1">
                4. Copy and paste the <code>src</code> (without the quotes) into the form location. Example below:
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                https://www.google.com/maps/d/embe d?mid=1LYAG9uDZbzRLc-uriAsEUYoquuDDbzQ&ehbc=2E3
              </Typography>
            </InstructionStep>
          </Box>
        </form>
      </FeatureCard>
    </StyledBox>
  )
}

export default EditTravelPlanForm
