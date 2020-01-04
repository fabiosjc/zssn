import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

const MiniCard = props => {
  const { className, resource, ...rest } = props;

  const classes = useStyles(props);

  return (
    <Card id="mini-card" {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {resource ? resource.toUpperCase() : ''}
            </Typography>
            <Typography variant="h3">{props.amount}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={props.color || classes.avatar}>
              {props.icon}
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography className={classes.caption} variant="caption">
            Average amount by survivor
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

MiniCard.propTypes = {
  className: PropTypes.string,
};

export default MiniCard;
