import React, {
  useContext,
  Fragment,
  useRef,
  useState,
  useCallback,
} from 'react';
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
import { values, capitalize, debounce } from 'lodash';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import MapLocation from '../../location/map-location/map-location';

const useStyles = makeStyles(() => ({
  root: {},
  align: {
    justifyContent: 'flex-end',
  },
}));

const ResistanceForm = props => {
  const { className, onChange, onReset, ...rest } = props;
  const survivor = useContext(SurvivorContext);
  const latInputRef = useRef();
  const lonInputRef = useRef();
  const [lonLat, setLonLat] = useState('-46.633308 -23.550520 ');
  const debounceUpdatePosition = useCallback(debounce(setLonLat, 1000), []);

  const classes = useStyles();

  const handleChange = event => {
    onChange(event);
  };

  const handleLonLat = event => {
    handleChange(event);

    const lat = latInputRef.current.value;
    const lon = lonInputRef.current.value;
    const lonLat = `${lon} ${lat}`;

    // Sync changes between Lat/Long Inputs and the Map, preventing multiple calls
    debounceUpdatePosition(lonLat);
  };

  const onClearForm = event => {
    onReset(event);
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

    let parsedStr = '';
    for (let [key, value] of Object.entries(inventory)) {
      if (value) {
        parsedStr = parsedStr + `${capitalize(key)}:${value};`;
      }
    }

    // return `Water:${inventory.water}; Food: ${inventory.food}; Medication: ${inventory.medication};Ammunition:${inventory.ammunition}`;
    return parsedStr.substr(0, parsedStr.length - 1);
  };

  const onSave = event => {
    event.preventDefault();
    const { age, name, gender } = survivor;
    const person = {
      name,
      age,
      gender,
      lonlat: `Point(${survivor.location.longitude} ${survivor.location.latitude})`,
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

          onClearForm(event);
        },
        error => {
          NotificationManager.error(
            `Error: ${JSON.stringify(error.response.data)}`,
            `Error saving record`
          );
        }
      )
      .finally(() => {
        props.showLoading(false);
      });
  };

  const inventoryHasItems = inventory => {
    return values(inventory).some(item => item !== undefined && item !== '');
  };

  const updatePosition = location => {
    handleChange({
      target: { name: 'location.latitude', value: location.lat },
    });
    handleChange({
      target: { name: 'location.longitude', value: location.lng },
    });
  };

  return (
    <SurvivorConsumer>
      {survivor => (
        <Card {...rest} className={clsx(classes.root, className)}>
          {/* <pre>FORM SURVIVOR : {JSON.stringify(survivor, null, 2)}</pre> */}
          <form autoComplete="off" onSubmit={onSave}>
            <CardHeader
              title={resistanceTitle}
              subheader="Add new survivor to the resistance"
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
                    onChange={handleLonLat}
                    type="number"
                    inputRef={latInputRef}
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
                    onChange={handleLonLat}
                    type="number"
                    inputRef={lonInputRef}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <MapLocation
                    lonlat={lonLat}
                    showButtons={false}
                    onDragMarker={updatePosition}
                  ></MapLocation>
                </Grid>

                <InventoryForm
                  inventory={survivor.inventory}
                  onChange={handleChange}
                />
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.align}>
              <Button onClick={onClearForm}>Clear</Button>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </CardActions>
          </form>
        </Card>
      )}
    </SurvivorConsumer>
  );
};

export default ResistanceForm;
