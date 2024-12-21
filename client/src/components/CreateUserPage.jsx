import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, Typography, TextField, Button } from '@mui/material'

const CreateUserPage = () => {
  const navigate = useNavigate()

  const initialValues = {
    name: "",
    username: "",
    password: "",  
  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required.'),
    username: yup.string().required('Username is required.'),
    password: yup.string().required('Password is required.') 
  })

  // Sends a post request for a new user that was just created with validations. 
  const createUser = (values) => {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    .then((resp) => {
      if (resp.status === 422) {
        alert("User needs to be unique!")
      } else {
        alert("User was created!")
        navigate('/login')
      }
    })
    .catch((err) => {
      console.error("Error creating user:", err)
      alert("An error occurred. Please try again.")
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      await createUser(values)
    },
  })

  return (

    <div className='createUserDiv'>
      <Box sx={{ padding: 3, maxWidth: 300, margin: 'auto', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create Traveler
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name && formik.touched.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.username && formik.touched.username)}
              helperText={formik.touched.username && formik.errors.username}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.password && formik.touched.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create User
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  )
}

export default CreateUserPage
