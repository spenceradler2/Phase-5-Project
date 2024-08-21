import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

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
    marginRight: 20,
  },
  menuButton: {
    marginLeft: 'auto',
  },
  menu: {
    maxHeight: 400,
    width: '45ch',
    backgroundColor: 'lightblue',
    color: 'blue',
    fontFamily: 'fantasy',
  },
  menuItem: {
    fontSize: '0.9rem',  // Adjust the font size here
  },
};

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar style={styles.appBar}>
      <Toolbar>
        <Typography variant="h4" style={styles.title}>
          TravelPlan
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
          <MenuItem component={Link} to="/" onClick={handleClose} style={styles.menuItem}>
            WELCOME PAGE
          </MenuItem>
          <MenuItem component={Link} to="/create_traveler" onClick={handleClose} style={styles.menuItem}>
            CREATE TRAVELER
          </MenuItem>
          <MenuItem component={Link} to="/travel_plans" onClick={handleClose} style={styles.menuItem}>
            SHOW ALL TRAVEL PLANS
          </MenuItem>
          <MenuItem component={Link} to="/travel_plans/new" onClick={handleClose} style={styles.menuItem}>
            ADD A TRAVEL PLAN
          </MenuItem>
          <MenuItem component={Link} to="/users_travel_plans" onClick={handleClose} style={styles.menuItem}>
            SHOW THE TRAVEL PLANS OF A TRAVELER
          </MenuItem>
          <MenuItem component={Link} to="/locations_travel_plans" onClick={handleClose} style={styles.menuItem}>
            SHOW THE TRAVEL PLANS FOR A LOCATION
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
