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
} from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { makeStyles } from '@material-ui/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import { NotificationManager } from 'react-notifications';
import LoadingOverlay from 'react-loading-overlay';

const initialState = {
  name: '',
  age: '',
  gender: '',
  location: {
    longitude: '',
    latitude: '',
  },
  infected: '',
  inventory: {
    water: '',
    food: '',
    medication: '',
    ammunition: '',
  },
};

const newSurvivor = cloneDeep(initialState);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing ? theme.spacing(4) : '',
  },
  card: {
    padding: theme.spacing ? theme.spacing(3) : '',
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

  const classes = useStyles();

  const handleChange = event => {
    setSurvivorId(event.target.value);
  };

  const searchSurvivor = event => {
    if (!survivorId) {
      NotificationManager.alert(
        'Please inform the identification number to perform the action',
        `Field is required`
      );
    }

    setIsLoading(true);
    axios
      .get(
        `http://zssn-backend-example.herokuapp.com/api/people/${survivorId}.json`
      )
      .then(
        result => {
          let survivor = result.data;

          setSurvivor(survivor);
        },
        error => {
          NotificationManager.error(
            `Error: ${JSON.stringify(error.response.data)}`,
            `Member cannot be found.`
          );
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <LoadingOverlay
        active={isLoading}
        spinner
        text="Loading..."
        className="height-100 overflow-hidden"
      >
        <Card className={classes.card}>
          <Grid id="location" container>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <CardHeader
                title={resistanceTitle}
                subheader="Use the member identification to update the last location "
                className="card-header"
              />
              <Divider />
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircleIcon />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="member-id"
                    name="survivorId"
                    label="Member Identification"
                    fullWidth={true}
                    margin={'normal'}
                    size={'medium'}
                    type={'string'}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={searchSurvivor}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={7} md={6} xl={8} xs={12}>
              {survivor && (
                <div>
                  Survivor:
                  {JSON.stringify(survivor)}
                </div>
              )}
            </Grid>
            <Grid item lg={5} md={6} xl={4} xs={12}>
              {/* <SurvivorProfile survivor={survivor} /> */}
            </Grid>
          </Grid>
        </Card>
      </LoadingOverlay>
    </div>
  );
};

export default Location;
