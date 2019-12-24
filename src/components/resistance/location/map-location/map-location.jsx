import React, { Component } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withStyles } from '@material-ui/styles';
import { cloneDeep } from 'lodash';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

const styles = theme => ({
  root: {
    padding: theme.spacing ? theme.spacing(4) : '',
  },
  margin: {
    margin: theme.spacing(1),
  },
});

class MapLocation extends Component {
  constructor(props) {
    super(props);
    const position = props.lonlat
      ? props.lonlat.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g)
      : [];

    this.initialPosition = {
      lonlat: props.lonlat,
      center: {
        lat: this.getLatitude(position),
        lng: this.getLongitude(position),
      },
      marker: {
        lat: this.getLatitude(position),
        lng: this.getLongitude(position),
      },
      zoom: 13,
      draggable: true,
      survivor: props.survivor,
    };

    this.state = cloneDeep(this.initialPosition);

    this.refmarker = React.createRef();
  }

  getLongitude = cordinates => {
    return cordinates && cordinates.length === 2 ? cordinates[0] : '';
  };

  getLatitude = cordinates => {
    return cordinates && cordinates.length === 2 ? cordinates[1] : '';
  };

  updatePosition = () => {
    const marker = this.refmarker.current;
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng(),
      });
    }
  };

  isLocationChanged = () => {
    return (
      Number(this.state.marker.lat) !== Number(this.state.center.lat) ||
      Number(this.state.marker.lng) !== Number(this.state.center.lng)
    );
  };

  cancelUpdate = () => {
    this.setState(this.initialPosition);
  };

  savePosition = () => {
    const { name, age, gender } = this.state.survivor;
    const person = {
      name,
      age,
      gender,
      lonlat: `Point(${this.state.marker.lng} ${this.state.marker.lat})`,
    };

    const survivorId = this.state.survivor.id;

    if (!survivorId) {
      NotificationManager.error(
        `Unable to find the survivor id: ${survivorId}`,
        `Error.`
      );
      return;
    }

    axios
      .patch(
        `http://zssn-backend-example.herokuapp.com/api/people/${survivorId}.json`,
        person
      )
      .then(
        result => {
          NotificationManager.success(
            `Your location has been updated. [${this.state.marker}]`,
            'Success!'
          );
        },
        error => {
          NotificationManager.error(
            `Unable to update the location: ${JSON.stringify(
              error.response.data
            )}`,
            `Error.`
          );
        }
      );
  };

  render() {
    const { classes } = this.props;
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    return (
      <div className={classes.root}>
        <Grid id="map-location" container>
          {/* <Grid item>{JSON.stringify(this.state, null, 2)}</Grid> */}
          <Grid item>
            <Typography component="span">
              Drag the marker to change the location
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Map
              center={position}
              zoom={6}
              maxZoom={10}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
              animate={true}
              easeLinearity={0.35}
            >
              <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              <Marker
                position={markerPosition}
                draggable={true}
                onDragend={this.updatePosition}
                ref={this.refmarker}
              >
                ><Popup>Current location. Drag to change the location</Popup>
              </Marker>
            </Map>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Typography component="p">
              {`Latitude: ${markerPosition[0]} | Longitude: ${markerPosition[1]}`}
            </Typography>
          </Grid>

          <Button color="primary" onClick={this.cancelUpdate}>
            Cancel
          </Button>

          <Button
            color="primary"
            variant="contained"
            disabled={!this.isLocationChanged()}
            onClick={this.savePosition}
          >
            Update
          </Button>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MapLocation);
