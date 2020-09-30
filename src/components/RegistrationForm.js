import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

export default function RegistrationForm(props) {
  return (
    <Container>
      <Grid 
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography gutterBottom variant="h6" style={{marginBottom: 7, marginTop: 24, fontWeight: 'bold'}}>Enter Employee Number</Typography>
          <TextField 
            value={props.employee_number}
            onChange={props.handleEmployeeNumberOnChange}
            variant="outlined"
            style={{marginBottom: 12}}
            autoFocus
            placeholder="Employee number"
          />
        </Grid>
        <Grid item>
          {
            props.employee_number ? (
              <>
              <Button variant="contained" color="primary" size="large" onClick={props.handleSubmitRegister} >Submit</Button>
              </>
            ):(
              <>
              <Button variant="outlined" disabled size="large" >Submit</Button>
              </>
            )
          }
        </Grid>
      </Grid>
    </Container>
  );
}
