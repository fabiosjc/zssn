import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SurvivorProfile from './survivor-profile';
import ResistanceForm from './resistance-form';
import { SurvivorProvider } from './survivor-context';
import { set, cloneDeep } from 'lodash';
import LoadingOverlay from 'react-loading-overlay';

const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(4),
    padding: 4,
  },
}));

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

export const NewSurvivorContext = React.createContext(newSurvivor);

const NewSurvivor = () => {
  const classes = useStyles();

  const [survivor, setSurvivor] = useState(newSurvivor);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = event => {
    const currentSurvivor = set(
      { ...survivor },
      event.target.name,
      event.target.value
    );
    setSurvivor(currentSurvivor);
  };

  const handleLoading = isLoading => {
    setIsLoading(isLoading);
  };

  const clearForm = event => {
    const survivor = cloneDeep(initialState);
    setSurvivor(survivor);
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
              {/* {JSON.stringify(initialState)} */}
              <ResistanceForm
                id="resistance-form"
                survivor={survivor}
                onChange={handleChange}
                showLoading={handleLoading}
                onReset={clearForm}
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
