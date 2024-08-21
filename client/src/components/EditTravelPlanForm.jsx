import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { updateTravelPlan } from '../redux/travelPlans/travelPlansSlice'
import { Box, Typography, TextField, Button, Link } from '@mui/material'

const EditTravelPlanForm = () => {
  const travelPlans = useSelector((state) => state.travelPlans.travelPlans)
  const { id } = useParams()
  const travelPlan = travelPlans.find((plan) => plan.id === parseInt(id))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    name: travelPlan.name,
    iframe_src_or_link: travelPlan.iframe_src_or_link,
    start_date: travelPlan.start_date,
    end_date: travelPlan.end_date,
  };

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
    onSubmit: async (values) => {
      await dispatch(updateTravelPlan({ id: parseInt(id), values }));
      navigate('/travel_plans');
    },
  })

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit {travelPlan.name}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <TextField
            // fullWidth
            style = {{width: 300}}
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
            style = {{width: 300}}
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
            <Typography variant="body2" sx={{ mt: 1 }}>
              See below how to get the iframe source.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            style = {{width: 300}}
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
            style = {{width: 300}}
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

        <Button type="submit" variant="contained" color="primary">
          Update Travel Plan
        </Button>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">How to add the iframe:</Typography>
          <ol style = {{width: 300}}>
            <li>Once your map is created make sure all items under share are checked.</li>
            <li>Go to the same card and click on the 3 dots in the top right corner.</li>
            <li>Go to "Embed on my site."</li>
            <li>Copy and paste the src (without the quotes) into the form location. See example below:</li>
            <li>https://www.google.com/maps/d/embed?mid=1LYAG9uDZbzRLc-uriAsEUYoquuDDbzQ&ehbc=2E3</li>
          </ol>
        </Box>
      </form>
    </Box>
  )
}

export default EditTravelPlanForm
