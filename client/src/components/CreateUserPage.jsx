import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Typography, TextField, Button } from '@mui/material';

const CreateUserPage = () => {
  const navigate = useNavigate()

  const initialValues = {
    name: "",
    username: "",
    // password: "",

  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required.'),
    username: yup.string().required('Username is required.'),
    // password: yup.string().required('Password is required.')

  })

  function createUser(values){
    fetch("http://localhost:5555/api/users", {
      method: "POST",
      headers: 
      {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)

    })
    .then((resp) => {
        if (resp.status==422){
        alert("User needs to be unique!")
        }
        else{
        alert("User was created!")
        navigate('/');
        }
    })
}

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      await (createUser( values ));
    },
  });

  return (
    <div className='createUserDiv'>
    <Box classnamesx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create Traveler
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <TextField
            // fullWidth
            label="Name"
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
            // fullWidth
            label="Username"
            variant="outlined"
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.username)}
            helperText={formik.errors.username}
          />
        </Box>

        {/* <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Provide Password"
            variant="outlined"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password}
          />
        </Box> */}

        <Button type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </form>
    </Box>
    </div>
  );
};

export default CreateUserPage;
