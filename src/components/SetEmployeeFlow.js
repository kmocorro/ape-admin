import React, { useState } from 'react';
import {navigate} from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import Link from './Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


const flow = [
  {id: 1, process: 'Cohen (PSS)', phase: 1, date: 'October 12 - 16'},
  {id: 2, process: 'Blood Extraction', phase: 1, date: 'October 12 - 16'},
  {id: 3, process: 'Submit Urine', phase: 1, date: 'October 12 - 16'},
  {id: 4, process: 'Pap Smear', phase: 1, date: 'October 12 - 16'},
  {id: 5, process: 'Eye Test', phase: 1, date: 'October 12 - 16'},
  {id: 6, process: 'ECG', phase: 1, date: 'October 12 - 16'},
  {id: 7, process: 'Xray', phase: 1, date: 'October 12 - 16'},
  /*
  {id: 12, process: 'Vital Signs, Height, Weight', phase: 2, date: 'October 26 - 30'},
  {id: 13, process: 'Physical Exam', phase: 2, date: 'October 26 - 30'},
  {id: 14, process: 'PFT', phase: 2, date: 'October 26 - 30'},
  {id: 15, process: 'Dental', phase: 2, date: 'October 26 - 30'},
  */
]

export default function SetEmployeeFlow(props) {

  const classes = useStyles();
  const currentFlow = props.employee_flow.flow;

  const comparedResult = flow.filter(o => !currentFlow.find(o2 => o.id === parseInt(o2.flow_id)))

  console.log(currentFlow)

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography gutterBottom variant="h6" style={{marginTop: 24, fontWeight: 'bold'}}>Select APE Process Flow</Typography>
          <Typography variant="body1" gutterBottom >Employee number: <strong>{props.employeeData.id}</strong></Typography>
          <Typography variant="body1" gutterBottom >Name: <strong>{props.employeeData.name}</strong></Typography>
          
          <Divider />
          {
            !props.employeeData.id ? (
              <Typography align="center" style={{marginTop: 12, marginBottom: 12}}>Unable to find employee number.</Typography>
            ):(
              comparedResult.map((label) => (
                <ListItem key={label.id} dense button onClick={props.handleToggle(label.id)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={props.checked.indexOf(label.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText id={label.id} primary={label.process} secondary={`Phase ${label.phase} -> ${label.date}`} />
                </ListItem>
              ))
            )
          }
        </Grid>
        <Grid item align="right">
          <Divider />
          {
            props.checked.length > 1 && props.employeeData.id && comparedResult.length > 0 ? (
              <>
              <Typography variant="body2" color="textSecondary" gutterBottom  style={{marginBottom: 16, marginTop: 8}}>By clicking submit, you indicate that all information you submitted are true and correct.</Typography>
              <Button size="large" onClick={props.handleBackTohome}  style={{marginRight: 16}}>Back</Button>
              <Button variant="contained" color="primary" size="large" onClick={props.handleOpenSetEmployeeFlowDialogBox} >Submit</Button>
              </>
            ):(
              <>
              {comparedResult.length > 0 ? (<></>):(<Typography align="center" style={{marginTop: 12, marginBottom: 12}}>No APE process left for {props.employeeData.name}</Typography>)}
              <Typography variant="body2" color="textSecondary" gutterBottom style={{marginBottom: 16, marginTop: 8}}>By clicking submit, you indicate that all information you submitted are true and correct.</Typography>
              <Button size="large" onClick={props.handleBackTohome}  style={{marginRight: 16}}  >Back</Button>
              <Button variant="outlined" disabled size="large"  >Submit</Button>
              </>
            )
          }
        </Grid>
        <Dialog
          open={props.toggleOpenDialogFlow}
          onClose={props.handleCloseSetEmployeeFlowDialogBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm APE process flow?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Setting APE process flow means that you have acknowledged and verified the employee. <strong>{props.employeeData.name}</strong> will now proceed to follow the process of APE that you have set.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleCloseSetEmployeeFlowDialogBox} color="primary">
              Cancel
            </Button>
            <Button onClick={props.handleSubmitEmployeeFlow} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );
}
