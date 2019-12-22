import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'right',
  },
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{' '}
        <Link component="a" href="https://fabiosjc.github.io/" target="_blank">
          Fábio Henrique
        </Link>
        . {new Date().getFullYear()}
      </Typography>
      <Typography variant="caption">A challenge made in react.</Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
