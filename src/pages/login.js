import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import Cookies from 'universal-cookie';
import { navigate } from 'gatsby';

const cookies = new Cookies();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Index() {

  const [ token, setToken ] = useState('');
  console.log(token);
  const [ loginResponse, setLoginResponse ] = useState('');
  console.log(loginResponse);

  if(token.token){
    cookies.set('token', token.token);
  } else {
    cookies.set('token', '');
  }

  const username = useLogin('');
  const password = useLogin('');


  
  function useLogin(init){
    const [ value, setValue ] = useState(init);
    const handleOnChange = (e) => {
      setValue(e.target.value);
      setLoginResponse('')
    } 
    return {
      value,
      onChange: handleOnChange
    }
  }

  async function handleCreateAdmin(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', '123456789');

    let response = await fetch('http://meswebspf409.sunpowercorp.com:8080/api/create-admin', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        username: 'ape',
        password: 'maxeonclinicP4ss!',
        fullname: 'Maxeon Clinic',
      })
    })

    if(response.status === 200){
      console.log(await response.json());
    }
  }

  async function handleLogin(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', '123456789');

    let response = await fetch('http://meswebspf409.sunpowercorp.com:8080/api/admin-login', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    if(response.status === 200){
      setToken(await response.json());
      navigate('/')
    } else if(response.status === 401){
      setLoginResponse(await response.json())
    }
  }


  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h3" component="h6" style={{fontWeight: 'bold', display:'ruby'}} gutterBottom>
          maxeon ape <div style={{color: 'red'}}>{` `}+</div>
        </Typography>
        <Container>
          <Grid container >
            <Typography variant="h6" gutterBottom style={{fontWeight: 'bold', marginBottom: 12}} >Clinic Login</Typography>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="subtitle2">Username</Typography>
              <TextField 
                type="text"
                variant="outlined"
                id="username"
                margin="dense"
                value={username.value}
                onChange={username.onChange}
              />
              <Typography variant="subtitle2">Password</Typography>
              <TextField 
                type="password"
                variant="outlined"
                id="username"
                margin="dense"
                value={password.value}
                onChange={password.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{marginTop: 12, marginBottom: 8}} >
                By continuing means that you have read and agree to the terms and conditions of maxeon ape +
              </Typography>
              {
                loginResponse ? (
                  <Typography color="error" gutterBottom>{loginResponse.message}</Typography>
                ):(
                  <></>
                )
              }
              {
                username.value && password.value ? (
                  <Button size="large" variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                ):(
                  <Button size="large" variant="outlined" disabled>Login</Button>
                )
              }
            </Grid>
          </Grid>
        </Container>
        
      </Box>
    </Container>
  );
}
