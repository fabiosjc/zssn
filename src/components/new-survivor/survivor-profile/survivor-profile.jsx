import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Grid,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import GavelIcon from '@material-ui/icons/Gavel';

import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import SurvivorContext, { SurvivorConsumer } from '../survivor-context';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
}));

const SurvivorProfile = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const formatLatLon = (latitude, longitude) => {
    return latitude && longitude ? `${latitude}, ${longitude}` : '';
  };

  return (
    <SurvivorConsumer>
      {survivor => (
        <Card {...rest} className={clsx(classes.root, className)}>
          <CardContent>
            <Grid className={classes.details}>
              <Grid container spacing={3} row>
                <Grid item md={12} xs={12}>
                  <Typography variant="h3">Name: {survivor.name}</Typography>
                </Grid>

                <Grid item md={6} xs={12}>
                  Age: {survivor.age}
                </Grid>

                <Grid item md={6} xs={12}>
                  Gender:{' '}
                  {survivor.gender === 'M' ? (
                    <FontAwesomeIcon icon={faMars} color="blue" size="lg" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faVenus}
                      color="deeppink"
                      size="lg"
                    />
                  )}
                </Grid>

                <Grid item md={12} xs={12}>
                  <span title="Last position (lat, lon)">
                    Last Postion:{' '}
                    {formatLatLon(
                      survivor.location.latitude,
                      survivor.location.longitude
                    )}
                  </span>
                </Grid>
              </Grid>
              <Avatar className={classes.avatar} src={survivor.avatar} />
            </Grid>
            <Divider style={{ margin: '25px 0' }} />
            <Grid container spacing={3} row>
              <Grid item md={12} xs={12}>
                <Typography variant="h4">Inventory</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <InvertColorsIcon />
                <Typography color="textSecondary" variant="p" component="span">
                  Water: {survivor.inventory.water}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <RestaurantIcon />
                <Typography color="textSecondary" variant="p" component="span">
                  Food: {survivor.inventory.food}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <LocalHospitalIcon />
                <Typography color="textSecondary" variant="p" component="span">
                  Medication: {survivor.inventory.medication}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <GavelIcon />
                <Typography color="textSecondary" variant="p" component="span">
                  Ammunition: {survivor.inventory.ammunition}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </SurvivorConsumer>
  );
};

export default SurvivorProfile;
