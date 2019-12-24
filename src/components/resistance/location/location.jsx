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
  Zoom,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NotificationManager } from 'react-notifications';
import LoadingOverlay from 'react-loading-overlay';
import MapLocation from './map-location/map-location';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing ? theme.spacing(4) : '',
  },
  card: {
    padding: theme.spacing ? theme.spacing(3) : '',
  },
  iconTop: {
    marginBottom: '1.4rem',
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
    axios
      .get(
        `http://zssn-backend-example.herokuapp.com/api/people/${survivorId}.json`
      )
      .then(
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
        className="height-100 overflow-hidden"
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
              <Grid container alignItems="flex-end">
                <Grid item lg={11} md={11} xs={11} className={classes.card}>
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
                  lg={1}
                  md={1}
                  xs={1}
                  item
                  alignContent={'center'}
                  alignItems={'stretch'}
                  direction={'column'}
                >
                  <IconButton
                    id="search-btn"
                    aria-label="delete"
                    onClick={searchSurvivor}
                    size="medium"
                    edge={'start'}
                    className={classes.iconTop}
                  >
                    <SearchIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12} className={classes.card}>
              {survivor && (
                <Zoom in={survivor}>
                  <ExpansionPanel expanded={expanded} onChange={onToggle}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      id="panel1a-header"
                    >
                      <Typography variant="h4" gutterBottom>
                        Current Location
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <MapLocation
                        lonlat={survivor.lonlat}
                        survivor={survivor}
                      ></MapLocation>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Zoom>
              )}
            </Grid>
          </Grid>
        </Card>
      </LoadingOverlay>
    </div>
  );
};

export default Location;
