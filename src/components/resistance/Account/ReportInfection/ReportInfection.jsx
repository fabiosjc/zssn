import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../../constants';

export default function ReportInfection(props) {
  // const [open, setOpen] = React.useState(false);

  const { name = '', location = '' } = props.infectedPerson;
  const infectedId = location.slice(location.lastIndexOf('/') + 1);
  const [resistanceId, setResistanceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = event => {
    setResistanceId(event.target.value);
  };

  const handleClose = () => {
    props.handleClose();
  };

  const clearForm = () => {
    setResistanceId('');
  };

  const onReportInfection = () => {
    if (!infectedId || !resistanceId) {
      NotificationManager.warning(
        'Please inform the infection suspect name and your resistance id',
        `Required fields`
      );
      return;
    }

    setIsLoading(true);
    axios
      .post(
        `${REACT_APP_API_URL}/api/people/${resistanceId}/report_infection.json`,
        {
          infected: infectedId,
          id: resistanceId,
        }
      )
      .then(
        result => {
          NotificationManager.success(
            `Information was successfully recorded`,
            'Thank you!'
          );
        },
        error => {
          NotificationManager.error(
            `Error: ${JSON.stringify(error.response.data)}`,
            `Error on report infection`
          );
        }
      )
      .finally(() => {
        clearForm();
        handleClose();
        setIsLoading(false);
      });
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth={'sm'}
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Report Infection</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="infected"
          label="Infected Member"
          type="text"
          fullWidth
          disabled
          defaultValue={name}
          value={name}
        />
        <TextField
          autoFocus
          margin="dense"
          id="resistanceId"
          label="Your Resistance Id"
          type="text"
          fullWidth
          false
          helperText="You must enter your resistance id for this operation"
          onChange={handleChange}
          value={resistanceId}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          endIcon={<FontAwesomeIcon icon={faBiohazard} />}
          disabled={!resistanceId.trim()}
          onClick={onReportInfection}
        >
          Report
        </Button>
      </DialogActions>
    </Dialog>
  );
}
