import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard, faUserShield } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../../constants';
import { get } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  chartContainer: {
    position: 'relative',
    height: '300px',
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  deviceIcon: {
    color: theme.palette.icon,
  },
}));

const WarPercentage = props => {
  const { className, ...rest } = props;
  const [averageInfected, setAverageInfected] = useState(0);
  const [averageNonInfected, setAverageNonInfected] = useState(0);

  const classes = useStyles();
  const theme = useTheme();

  const fetchAverages = async ({
    averageType = 'infected',
    averageField = 'average_infected',
  }) => {
    await axios
      .get(`${REACT_APP_API_URL}/api/report/${averageType}.json`)
      .then(result => {
        let average = get(result, `data.report.${averageField}`, 0);
        averageType === 'infected'
          ? setAverageInfected(average)
          : setAverageNonInfected(average);
      });
  };

  React.useEffect(() => {
    fetchAverages({
      averageType: 'infected',
      averageField: 'average_infected',
    });

    fetchAverages({
      averageType: 'non_infected',
      averageField: 'average_healthy',
    });
  }, []);

  const data = {
    datasets: [
      {
        data: [averageNonInfected, averageInfected],
        backgroundColor: [
          theme ? theme.palette.primary.main : 'darkblue',
          theme ? theme.palette.warning.main : 'orange',
        ],
        borderWidth: 8,
        borderColor: theme ? theme.palette.white : 'white',
        hoverBorderColor: theme ? theme.palette.white : 'white',
      },
    ],
    labels: ['Resistance', 'Infected'],
  };

  const options = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme ? theme.palette.divider : 'white',
      backgroundColor: theme ? theme.palette.white : 'white',
      titleFontColor: theme ? theme.palette.text.primary : 'white',
      bodyFontColor: theme ? theme.palette.text.secondary : 'white',
      footerFontColor: theme ? theme.palette.text.secondary : 'white',
    },
  };

  const devices = [
    {
      title: 'Resistance',
      value: averageNonInfected,
      icon: <FontAwesomeIcon icon={faUserShield} />,
      color: theme ? theme.palette.primary.main : '',
    },
    {
      title: 'Infecteds',
      value: averageInfected,
      icon: <FontAwesomeIcon icon={faBiohazard} />,
      color: theme ? theme.palette.warning.main : '',
    },
  ];

  return (
    <Card
      id="war-percentage"
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Map of War"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div className={classes.device} key={device.title}>
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography style={{ color: device.color }} variant="h2">
                {Number(device.value * 100).toFixed(2)}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WarPercentage;
