import React, { Component } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  Divider,
  CardContent,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import { withStyles } from '@material-ui/styles';

import SecurityIcon from '@material-ui/icons/Security';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ResistanceTableList from './resistance-table-list.jsx/';
import axios from 'axios';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const styles = theme => ({
  root: {
    padding: theme.spacing(5),
  },

  card: {
    margin: theme.spacing(5),
    padding: 20,
  },
  iconTop: {
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
  },
  container: {
    display: 'flex',
  },
  loading: {
    minHeight: '94.9vh',
    padding: 0,
    marginTop: -20,
    overflow: 'hidden',
  },
});

const searchAPI = () =>
  axios.get(`http://zssn-backend-example.herokuapp.com/api/people.json`);

const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 400);

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      survivors: [],
      searchText: '',
    };
  }

  componentDidMount() {
    this.onSearch();
  }

  onSearch = async (searchText = '') => {
    let survivors = [];
    this.setState({ searchText, survivors, isLoading: true });

    /*1. Although the API responds with all records, without
      filtering, we always chose to perform backend searching
      before filtering data to ensure that newly created data
      appears in the search results.
      
      2. Debounce technique was used to prevent multiple calls 
      when  the user is typing */
    const result = await searchAPIDebounced(searchText.trim());

    survivors =
      searchText.trim() === ''
        ? result.data
        : this.filterResults(result.data, searchText);

    this.setState({
      survivors,
      searchText: '',
      isLoading: false,
    });
  };

  filterResults = (data, searchText) => {
    return data.filter(survivor => {
      let survivorName = survivor.name ? survivor.name.toLowerCase() : '';
      return survivorName.includes(searchText.toLowerCase());
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text="Loading..."
          className={classes.loading}
        >
          <Card className={classes.card}>
            <CardHeader
              title={
                <Typography variant="h3" component="h3">
                  <SecurityIcon /> Resistance Members
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={classes.root}>
                <Grid item md={12} xl={12} xs={12}>
                  <TextField
                    id="searchText"
                    name="searchText"
                    label="Search"
                    fullWidth={true}
                    margin="normal"
                    size="medium"
                    type="search"
                    placeholder="Search by name"
                    onChange={event => this.onSearch(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant={'outlined'}
                    required
                  />
                </Grid>
                <Grid item md={12} xl={12} xs={12}>
                  <ResistanceTableList list={this.state.survivors} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </LoadingOverlay>
      </div>
    );
  }
}

export default withStyles(styles)(Account);
