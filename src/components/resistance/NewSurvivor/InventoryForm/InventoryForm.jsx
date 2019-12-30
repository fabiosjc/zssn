import React, { Fragment } from 'react';
import {
  Grid,
  Divider,
  Typography,
  InputAdornment,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import GavelIcon from '@material-ui/icons/Gavel';

const InventoryForm = props => {
  const { className, onChange, ...rest } = props;

  const handleChange = event => {
    onChange(event);
  };

  return (
    <Fragment>
      <Grid item md={12} xs={12}>
        <Divider />
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography variant="h4">Inventory</Typography>
      </Grid>
      <Grid item md={3} xs={12}>
        <FormControl>
          <InputLabel htmlFor="water">Water *</InputLabel>
          <Input
            id="water"
            name="inventory.water"
            type="number"
            value={props.inventory.water}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <InvertColorsIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item md={3} xs={12}>
        <FormControl>
          <InputLabel htmlFor="food">Food *</InputLabel>
          <Input
            id="food"
            name="inventory.food"
            type="number"
            value={props.inventory.food}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <RestaurantIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item md={3} xs={12}>
        <FormControl>
          <InputLabel htmlFor="medication">Medication *</InputLabel>
          <Input
            id="medication"
            name="inventory.medication"
            type="number"
            value={props.inventory.medication}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <LocalHospitalIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item md={3} xs={12}>
        <FormControl>
          <InputLabel htmlFor="ammunition">Ammunition *</InputLabel>
          <Input
            id="ammunition"
            name="inventory.ammunition"
            type="number"
            value={props.inventory.ammunition}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <GavelIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </Fragment>
  );
};

export default InventoryForm;
