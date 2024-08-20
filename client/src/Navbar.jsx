// Navbar.js
import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const styles = {
  appBar: {
    position: 'fixed', 
    top: 0,           
    width: '100%',   
    marginBottom: 20, 
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: '1.2rem', 
    marginRight: 50,    
  },
  button: {
    marginLeft: 10
    ,
    fontSize: '0.7rem', 
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center', 
    padding: '0 16px',    
  },
};

const Navbar = () => {
  return (
    <AppBar style={styles.appBar}>
      <Toolbar style={styles.toolbar}>
        <Typography variant="h4" style={styles.title}>
          TravelPlan
        </Typography>
        <div>
          <Button variant= "outlined" color="inherit" component={Link} to="/" style={styles.button}>
            Welcome Page
          </Button>
          <Button variant= "outlined" color="inherit" component={Link} to="/create_traveler" style={styles.button}>
            Create traveler
          </Button>
          <Button variant= "outlined" color="inherit" component={Link} to="/travel_plans" style={styles.button}>
            Show all travel plans
          </Button>
          <Button variant= "outlined" color="inherit" component={Link} to="/travel_plans/new" style={styles.button}>
            Add a travel plan
          </Button>
          <Button variant= "outlined" color="inherit" component={Link} to="/users_travel_plans" style={styles.button}>
            Show the Travel Plans of a traveler
          </Button>
          <Button variant= "outlined" color="inherit" component={Link} to="/locations_travel_plans" style={styles.button}>
            Show the Travel Plans of a location
          </Button>

        </div>
      </Toolbar>
    </AppBar>
  )
}
export default Navbar