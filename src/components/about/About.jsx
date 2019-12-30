import React, { lazy, Suspense } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { importMDX } from 'mdx.macro';
const Content = lazy(() => importMDX('./about.md'));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'justify',

    '& h2, & h3': {
      margin: '2.7rem 0 1.5em 0',
    },
    '& a': {
      color: '#0062ff',
    },
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <div id="about" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Suspense fallback={<div>Loading...</div>}>
              <Content />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
