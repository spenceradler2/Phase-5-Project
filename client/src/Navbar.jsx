import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setLoggedInUser, logoutUser } from './redux/users/userSlice'

import MenuIcon from '@mui/icons-material/Menu'

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'skyblue',    
    display:"flex",
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginRight: 20,
    textDecoration: 'none', 
    color: 'inherit',  
    display: 'inline-flex',  
    alignItems: 'center', 
    textShadow: '.5px .5px 5px black, -.5px -.5px 0px black, .5px -.5px 0px black, -.5px .5px 0px black', 
    '&:hover': {
      textDecoration: 'none', 
      color: 'inherit',       
    }
  },
  menuButton: {
    marginLeft: 'auto',
    color: 'darkblue',
    // boxShadow: '.5px .5px 5px black, -.5px -.5px 0px black, .5px -.5px 0px black, -.5px .5px 0px black',     
  },
  menu: {
    maxHeight: 400,
    backgroundColor: 'lightblue',
    color: 'blue',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
  },
  menuItem: {
    fontSize: '0.9rem',
    padding: '10px 20px', 
  },
  menuItemWithDivider: {
    fontSize: '0.9rem',
    padding: '10px 20px',
    borderBottom: '1px solid black',
  },
}



const Navbar = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn)
  const dispatch = useDispatch()
  // State to control the open/close state of the menu.
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  // Sets the anchor point for the menu (where the menu will open from).
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  // Closes the menu when the user clicks outside or selects a menu item.
  const handleClose = () => {
    setAnchorEl(null)
  }
  // Check the current session on load and update state accordingly
  useEffect(() => {
    const checkSession = async () => {
      
        const response = await fetch('/api/check-session', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
  
        // Check for successful response
        if (response.status === 200) {
          const userData = await response.json()
          dispatch(setLoggedInUser(userData)) // Set the user in Redux state if the session is logged in
        } 
        // Check if the status is 401 and advise that the user is not signed in. 
        else if (response.status === 401) {
          dispatch(logoutUser()) 
          console.log('User is not signed in.') // Log message when user is not signed in
        } 
    }
    checkSession()
  }, [dispatch])

  return (
    <AppBar style={styles.appBar}>
      <Toolbar>
        {/* Title of the webpage in the top left. */}
        <Typography component={Link}  to="/" variant="h4" style={styles.title}>
          TravelPlan 🌍
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
          style={styles.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{ style: styles.menu }}
        >
          {/* Navigation buttons to select from.  */}
          <MenuItem component={Link} to="/" onClick={handleClose} style={styles.menuItemWithDivider}>
            WELCOME PAGE
          </MenuItem>
          <MenuItem component={Link} to="/create_traveler" onClick={handleClose} style={styles.menuItemWithDivider}>
            CREATE TRAVELER
          </MenuItem>
          <MenuItem component={Link} to="/login" onClick={handleClose} style={styles.menuItemWithDivider}>
            {loggedIn ? 'LOGOUT' : 'LOGIN'}
          </MenuItem>
          <MenuItem component={Link} to="/travel_plans/new" onClick={handleClose} style={styles.menuItemWithDivider}>
            ADD A TRAVEL PLAN
          </MenuItem>
          <MenuItem component={Link} to="/travel_plans" onClick={handleClose} style={styles.menuItemWithDivider}>
            SHOW ALL TRAVEL PLANS
          </MenuItem>
          <MenuItem component={Link} to="/users_travel_plans" onClick={handleClose} style={styles.menuItemWithDivider}>
            SHOW THE TRAVEL PLANS OF A TRAVELER
          </MenuItem>
          <MenuItem component={Link} to="/locations_travel_plans" onClick={handleClose} style={styles.menuItem}>
            SHOW THE TRAVEL PLANS FOR A LOCATION
          </MenuItem>

        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
