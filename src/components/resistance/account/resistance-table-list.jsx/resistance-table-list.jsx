import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Typography } from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PinDropIcon from '@material-ui/icons/PinDrop';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import FlagIcon from '@material-ui/icons/Flag';
import Gender from '../../gender';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import ReportInfection from '../report-infection';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
  actionButtons: {
    '&:hover': {
      color: '#3f51b5',
    },
  },
}));

const ResistanceTableList = props => {
  const { className, list, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const [infectedPerson, setInfectedPerson] = React.useState(null);

  const rows = list;

  const classes = useStyles();

  const showReportInfectionModal = (event, survivor) => {
    setOpen(true);
    setInfectedPerson(survivor);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Age</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Gender</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Location</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Infected?</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Typography variant="body1">{row.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{row.age}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <Gender value={row.gender} />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{row.lonlat}</Typography>
              </TableCell>
              <TableCell>
                {/* <FontAwesomeIcon
                  icon={faBiohazard}
                  size="2x"
                  color={row['infected?'] ? 'red' : '#ccc'}
                /> */}
                {row['infected?'] ? (
                  <CheckIcon color="primary" />
                ) : (
                  <ClearIcon color="error" />
                )}
              </TableCell>
              <TableCell>
                {
                  <IconButton
                    color="default"
                    aria-label="Report Infection"
                    className={classes.actionButtons}
                    title="Report Infection"
                    disabled={row['infected?'] ? true : false}
                    onClick={event => showReportInfectionModal(event, row)}
                  >
                    {/* <FontAwesomeIcon icon={faBiohazard} /> */}
                    <FlagIcon />
                  </IconButton>
                }
                {/* {
                  <IconButton
                    color="default"
                    aria-label="Update Location"
                    className={classes.actionButtons}
                    title="Update Location"
                  >
                    <LocationOnIcon />
                  </IconButton>
                } */}
                {/* <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<FontAwesomeIcon icon={faBiohazard} />}
                >
                  Report
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {infectedPerson && (
        <ReportInfection
          open={open}
          handleClose={handleClose}
          infectedPerson={infectedPerson}
        />
      )}
    </TableContainer>
  );
};

export default ResistanceTableList;
