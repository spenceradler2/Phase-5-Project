import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser } from '../redux/users/userSlice';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography, TextField, Button } from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // Formik hook for form management
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Send login request to the backend
        const resp = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // Pass form values
        });

        if (resp.status === 200) {
          const userData = await resp.json();
          dispatch(setUser(userData)); // Update Redux store with user data
        } else if (resp.status === 422) {
          // If login fails, check the error message
          const errorData = await resp.json();
          if (errorData.error === "Username or password didn't match") {
            alert("The username or password is incorrect. Please try again.");
          } else {
            alert("Oops, something went wrong.");
          }
        } else {
          alert("Oops, something went wrong.");
        }
      } catch (error) {
        console.log("An error occurred while logging in:", error);
        alert("An error occurred. Please try again later.");
      }
    },
  });

  // Logout function
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="loginDiv">
      {loggedIn ? (
        <Box sx={{ padding: 3, maxWidth: 300, margin: "auto", backgroundColor: "#f5f5f5", borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center">
            Welcome, {user.name}
          </Typography>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={{ padding: 3, maxWidth: 300, margin: "auto", backgroundColor: "#f5f5f5", borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center">
            Log In
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.password && formik.touched.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={formik.isSubmitting}>
                Log In
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </div>
  );
}

export default Login;
