import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SurvivorProfile from './survivor-profile';
import ResistenceForm from './resistence-form';
import { SurvivorProvider } from './survivor-context';
import { set } from 'lodash';
import LoadingOverlay from 'react-loading-overlay';

const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(4),
    padding: 4,
  },
}));

const newSurvivor = {
  name: undefined,
  age: undefined,
  gender: undefined,
  location: {
    longitude: undefined,
    latitude: undefined,
  },
  infected: false,
  inventory: {
    water: undefined,
    food: undefined,
    medication: undefined,
    ammunition: undefined,
  },
};

export const survivorContext = React.createContext(newSurvivor);

const NewSurvivor = () => {
  const classes = useStyles();

  const [survivor, setSurvivor] = useState(newSurvivor);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = event => {
    const obj = set({ ...survivor }, event.target.name, event.target.value);
    setSurvivor(obj);
  };

  const handleLoading = isLoading => {
    setIsLoading(isLoading);
  };

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Loading..."
      className="height-100 overflow-hidden"
    >
      <div id="new-survivor" className={classes.root}>
        <SurvivorProvider value={survivor}>
          <Grid container spacing={4}>
            <Grid item lg={7} md={6} xl={8} xs={12}>
              <ResistenceForm
                id="resistence-form"
                survivor={survivor}
                onChange={handleChange}
                showLoading={handleLoading}
              />
            </Grid>
            <Grid item lg={5} md={6} xl={4} xs={12}>
              <SurvivorProfile survivor={survivor} />
            </Grid>
          </Grid>
        </SurvivorProvider>
      </div>
    </LoadingOverlay>
  );
};

export default NewSurvivor;
