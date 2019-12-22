import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ReportIcon from '@material-ui/icons/Report';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    // background: '#277cb0',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  link: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/" className={classes.link}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <WifiTetheringIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title} color="inherit">
            ZSSN - Zombie Survival Social Network
          </Typography>
        </RouterLink>
        <div className={classes.flexGrow} />

        <span className={classes.toolbarButtons}>
          <Button
            color="inherit"
            component={Link}
            to="/add-for-resistance"
            startIcon={<PersonAddIcon />}
          >
            New Member
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/set-location"
            startIcon={<LocationOnIcon />}
          >
            Set Location
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/report-infection"
            startIcon={<ReportIcon />}
            disabled
          >
            Report Infection
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/report-infection"
            startIcon={<SwapHorizontalCircleIcon />}
            disabled
          >
            Trade Items
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/report-infection"
            startIcon={<DashboardIcon />}
            disabled
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/home"
            startIcon={<InfoIcon />}
            disabled
          >
            About
          </Button>
        </span>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
