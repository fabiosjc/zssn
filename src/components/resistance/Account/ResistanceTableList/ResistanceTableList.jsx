import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import FlagIcon from '@material-ui/icons/Flag';
import Gender from '../../Gender';
import ClearIcon from '@material-ui/icons/Clear';
import ReportInfection from '../ReportInfection';

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    marginTop: 20,
  },
  table: {
    minWidth: 650,
    '& .MuiTableCell-root': {
      padding: '10px 16px',
    },
  },
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
  tableHeader: {
    '& th': {
      fontSize: 16,
      background: '#fafafa',
    },
    '& .MuiTableCell-root': {
      borderColor: '#ddd',
    },
  },

  tableBody: {
    '& td': {
      // borderColor: '#eee',
    },
    '& .MuiIconButton-root': {
      padding: 10,
    },
  },
}));

const ResistanceTableList = props => {
  const [open, setOpen] = React.useState(false);
  const [infectedPerson, setInfectedPerson] = React.useState(null);
  const classes = useStyles();
  const rows = props.list;

  const showReportInfectionModal = (event, survivor) => {
    setOpen(true);
    setInfectedPerson(survivor);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Infected?</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {rows.map(row => (
            <TableRow key={row.name} hover>
              <TableCell>
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
                {row['infected?'] ? (
                  <CheckIcon color="primary" fontSize={'small'} />
                ) : (
                  <ClearIcon color="error" fontSize={'small'} />
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
