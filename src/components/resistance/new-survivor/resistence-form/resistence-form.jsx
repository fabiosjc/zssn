import React, { useContext, Fragment } from 'react';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InventoryForm from '../inventory-form';
import SecurityIcon from '@material-ui/icons/Security';
import SurvivorContext, { SurvivorConsumer } from '../survivor-context';
import axios from 'axios';
import { values } from 'lodash';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

const useStyles = makeStyles(() => ({
  root: {},
}));

const ResistenceForm = props => {
  const { className, onChange, ...rest } = props;
  const survivor = useContext(SurvivorContext);

  const classes = useStyles();

  const handleChange = event => {
    onChange(event);
  };

  const resistanceTitle = (
    <Fragment>
      <Typography variant="h3" component="h3">
        <SecurityIcon /> Resistance Member
      </Typography>
    </Fragment>
  );

  const getParsedInventory = inventory => {
    if (!inventory) return '';

    return `Water: ${inventory.water};Food: ${inventory.food};Medication: ${inventory.medication};Ammunition:${inventory.ammunition}`;
  };

  const onSave = event => {
    event.preventDefault();
    const person = {
      name: survivor.name,
      age: survivor.age,
      gender: survivor.gender,
      lonlat: `Point(${survivor.location.longitude}, ${survivor.location.latitude})`,
      items: getParsedInventory(survivor.inventory),
    };

    if (!inventoryHasItems(survivor.inventory)) {
      NotificationManager.warning(
        'Inventory has no items',
        'Help in trading items'
      );
      return;
    }

    props.showLoading(true);
    axios
      .post('http://zssn-backend-example.herokuapp.com/api/people.json', person)
      .then(
        result => {
          NotificationManager.success(
            `Your resistance-number is: ${result.data.id}`,
            'Congratulations!'
          );
        },
        error => {
          NotificationManager.error(
            `Error: ${error.response.data}`,
            `Error saving record`
          );
        }
      )
      .finally(() => {
        props.showLoading(false);
      });
  };

  const inventoryHasItems = inventory => {
    return values(inventory).some(item => item !== undefined);
  };

  return (
    <SurvivorConsumer>
      {survivor => (
        <Card {...rest} className={clsx(classes.root, className)}>
          <form autoComplete="off" onSubmit={onSave}>
            <CardHeader
              title={resistanceTitle}
              subheader="Add new survivor to the resistence"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Please specify the full name"
                    label="Full name"
                    margin="dense"
                    name="name"
                    onChange={handleChange}
                    required
                    value={survivor.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    fullWidth
                    label="Age"
                    margin="dense"
                    name="age"
                    onChange={handleChange}
                    required
                    value={survivor.age}
                    variant="outlined"
                    type="number"
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender"
                      value={survivor.gender}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="M"
                        control={<Radio />}
                        label="Male"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="F"
                        control={<Radio />}
                        label="Female"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    required
                    id="latitude"
                    name="location.latitude"
                    label="Latitude"
                    variant="outlined"
                    margin="dense"
                    value={survivor.location.latitude}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    required
                    id="longitude"
                    name="location.longitude"
                    label="longitude"
                    variant="outlined"
                    margin="dense"
                    value={survivor.location.longitude}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>

                <InventoryForm
                  inventory={survivor.inventory}
                  onChange={handleChange}
                />
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </CardActions>
          </form>
          <NotificationContainer leaveTimeout={1500} />
        </Card>
      )}
    </SurvivorConsumer>
  );
};

export default ResistenceForm;
