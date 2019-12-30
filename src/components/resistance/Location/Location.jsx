import React, { useState, Fragment } from 'react';
import axios from 'axios';
import {
  Grid,
  TextField,
  IconButton,
  Card,
  Typography,
  CardHeader,
  Divider,
  InputAdornment,
  Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

import { NotificationManager } from 'react-notifications';
import LoadingOverlay from 'react-loading-overlay';
import MapLocation from './MapLlocation/';
import { REACT_APP_API_URL } from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing ? theme.spacing(5) : '',
  },
  card: {
    padding: theme.spacing ? theme.spacing(3) : '',
  },
  iconTop: {
    marginTop: '2rem',
  },
  container: {
    display: 'flex',
  },
}));

const resistanceTitle = (
  <Fragment>
    <Typography variant="h3" component="h3">
      Update Location
    </Typography>
  </Fragment>
);

const Location = props => {
  const [survivorId, setSurvivorId] = useState(null);
  const [survivor, setSurvivor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = React.useState(true);

  const classes = useStyles();

  const handleChange = event => {
    setSurvivorId(event.target.value);
  };

  const searchSurvivor = event => {
    if (!survivorId) {
      NotificationManager.warning(
        'Please inform the identification number to perform this action',
        `Required field`
      );
      return;
    }

    setIsLoading(true);
    setSurvivor(null);
    axios.get(`${REACT_APP_API_URL}/api/people/${survivorId}.json`).then(
      result => {
        let survivor = result.data;
        setSurvivor(survivor);
        setIsLoading(false);
      },
      error => {
        NotificationManager.error(
          `Error: ${JSON.stringify(error.response.data)}`,
          `Member cannot be found.`
        );
        setIsLoading(false);
      }
    );
  };

  const onToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.root}>
      <LoadingOverlay
        active={isLoading}
        spinner
        text="Loading..."
        className="height-100"
      >
        <Card className={classes.card}>
          <Grid id="location" container>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <CardHeader
                title={resistanceTitle}
                subheader="Use the member id to update their last location"
                className="card-header"
              />
              <Divider />
              <Grid container>
                <Grid
                  item
                  lg={5}
                  md={5}
                  xl={11}
                  xs={11}
                  className={classes.card}
                >
                  <TextField
                    id="member-id"
                    name="survivorId"
                    label="Please inform the member id"
                    fullWidth={true}
                    margin="normal"
                    size="medium"
                    type="search"
                    onChange={handleChange}
                    value={survivorId}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant={'outlined'}
                    required
                  />
                </Grid>
                <Grid
                  item
                  lg={1}
                  md={1}
                  xl={1}
                  xs={1}
                  className={classes.iconTop}
                >
                  <IconButton
                    id="search-btn"
                    aria-label="search"
                    onClick={searchSurvivor}
                    size="medium"
                    edge={'start'}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={12}
                  xl={12}
                  xs={12}
                  className={classes.card}
                >
                  {survivor && (
                    <div className={classes.container}>
                      <Collapse in={survivor}>
                        <Typography variant="h4" gutterBottom>
                          Current Location
                        </Typography>
                        <MapLocation
                          id="map-from-location"
                          lonlat={survivor.lonlat}
                          survivor={survivor}
                        ></MapLocation>
                      </Collapse>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </LoadingOverlay>
    </div>
  );
};

export default Location;
