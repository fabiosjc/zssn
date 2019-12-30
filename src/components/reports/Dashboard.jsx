import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import GavelIcon from '@material-ui/icons/Gavel';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { MiniCard, LostPoints, WarPercentage } from './components';
import { REACT_APP_API_URL } from '../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  water: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56,
  },
  food: {
    backgroundColor: theme.palette.info.main,
    height: 56,
    width: 56,
  },
  medication: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56,
  },
  ammunition: {
    backgroundColor: theme.palette.success.dark,
    height: 56,
    width: 56,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [uninfecteds, setUninfecteds] = useState([]);
  const [resourcesAmount, setResourcesAmount] = useState(null);

  useEffect(() => {
    const calculateAverageOfResources = async () => {
      const result = await fetchAllSurvivors();
      const allUninfecteds = getUninfecteds(result.data);
      setUninfecteds(allUninfecteds);

      let promises = [];
      allUninfecteds.forEach(survivor => {
        let survivorId = getIdByLocation(survivor.location);
        let inventoryResult = fetchInventory(survivorId);
        promises.push(inventoryResult);
      });

      const allInventoriesPromises = await Promise.all(promises);
      const inventories = allInventoriesPromises.map(item => item.data);
      const amountByResource = getAmountByResources(inventories);
      setResourcesAmount(amountByResource);
    };

    const getAmountByResources = inventories => {
      let amount = { water: 0, food: 0, ammunition: 0, medication: 0 };

      inventories.forEach(inventory => {
        inventory.forEach(resource => {
          sumItemsByResource(amount, resource, 'Water');
          sumItemsByResource(amount, resource, 'Food');
          sumItemsByResource(amount, resource, 'Medication');
          sumItemsByResource(amount, resource, 'Ammunition');
        });
      });

      return amount;
    };

    calculateAverageOfResources();
  }, []);

  const sumItemsByResource = (amount, resource, itemName) => {
    if (resource.item.name !== itemName) {
      return;
    }

    return (amount[itemName.toLowerCase()] += resource.quantity);
  };

  const fetchAllSurvivors = () => {
    return axios.get(`${REACT_APP_API_URL}/api/people.json`);
  };

  const fetchInventory = survivorId => {
    return axios.get(
      `${REACT_APP_API_URL}/api/people/${survivorId}/properties.json`
    );
  };

  const getUninfecteds = allSurvivors => {
    return allSurvivors.filter(survivor => !survivor['infected?']);
  };

  const getIdByLocation = location => {
    return location.slice(location.lastIndexOf('/') + 1);
  };

  const getTotalOfResources = itemName => {
    return resourcesAmount ? (
      Number(resourcesAmount[itemName] / uninfecteds.length).toFixed(2)
    ) : (
      <ScaleLoader height={22} color={'#ddd'} loading={true} />
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6} md={6} xl={6}>
          <WarPercentage />
        </Grid>
        <Grid item xs={12} lg={6} md={6} xl={6}>
          <Grid container spacing={10}>
            <Grid item lg={6} md={6} xl={6} sm={6} xs={12}>
              <MiniCard
                resource={'Water'}
                icon={<InvertColorsIcon />}
                color={classes.water}
                amount={getTotalOfResources('water')}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} sm={6} xs={12}>
              <MiniCard
                resource={'Food'}
                icon={<RestaurantIcon />}
                color={classes.water}
                amount={getTotalOfResources('food')}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} sm={6} xs={12}>
              <MiniCard
                resource={'Medication'}
                icon={<LocalHospitalIcon />}
                color={classes.medication}
                amount={getTotalOfResources('medication')}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} sm={6} xs={12}>
              <MiniCard
                resource={'Ammunition'}
                icon={<GavelIcon />}
                color={classes.medication}
                amount={getTotalOfResources('ammunition')}
              />
            </Grid>
            <Grid item lg={6} md={6} xl={6} sm={6} xs={12}>
              <LostPoints />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
