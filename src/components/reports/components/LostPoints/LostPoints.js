import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import axios from 'axios';
import { get } from 'lodash';
import { REACT_APP_API_URL } from '../../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.primary.contrastText,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.warning.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
}));

const LostPoints = props => {
  const { className, ...rest } = props;
  const [totalPointsLost, setTotalPointsLost] = useState(0);

  const classes = useStyles();

  const fetchTotalPointsLost = () => {
    axios
      .get(`${REACT_APP_API_URL}/api/report/infected_points.json`)
      .then(result => {
        const points = get(result, `data.report.total_points_lost`, 0);
        setTotalPointsLost(points);
      });
  };

  useEffect(() => {
    fetchTotalPointsLost();
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              TOTAL POINTS LOST
            </Typography>
            <Typography color="inherit" variant="h3">
              {totalPointsLost}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

LostPoints.propTypes = {
  className: PropTypes.string,
};

export default LostPoints;
