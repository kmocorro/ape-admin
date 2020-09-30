import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import RegistrationForm from '../components/RegistrationForm';
import SetEmployeeFlow from '../components/SetEmployeeFlow';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Cookies from 'universal-cookie';
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
  
  const isToken = cookies.get('token');
  console.log(isToken);
  
  const [ employee_number, setEmployee_number ] = useState('');
  const [ employeeData, setEmployeeData ] = useState('');

  const [ employee_flow, setEmployee_flow ] = useState({flow: []})
  console.log(employee_flow);

  const [ toggle_employee_number, setToggle_employee_number ] = useState(false);

  const handleEmployeeNumberOnChange = (e) => {
    setEmployee_number(e.target.value);
  }

  const handleBackTohome = () => {
    setToggle_employee_number(false);
    setOpenSetEmployeeFlowSuccess(false);
    setEmployee_number('');
  }

  async function handleSubmitRegister(){
    setToggle_employee_number(true);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', isToken);

    let response = await fetch('http://localhost:8080/admin/employee', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        employee_number: employee_number
      })
    })

    if(response.status === 200){
      setEmployee_flow(await response.json());
    }

    let responseAccountInfo = await fetch(`http://dev-metaspf401.sunpowercorp.com:4848/getaccountinfo/${employee_number}`)
    if(responseAccountInfo.status === 200){
      setEmployeeData(await responseAccountInfo.json())
    }
  }

  /// setttttttttttttttt
  const phase1_auto_checked = [1,2,3,5,7];
  const phase2_auto_checked = [12,13,14,15];

  const [checked, setChecked] = useState(phase1_auto_checked);
  const [toggleOpenDialogFlow, setOpenToggleDialogFlow] = useState(false);

  const [openSetEmployeeFlowSuccess, setOpenSetEmployeeFlowSuccess] = useState(false);
  const [employeeFlowResponse, setEmployeeFlowResponse] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleOpenSetEmployeeFlowDialogBox = () => {
    setOpenToggleDialogFlow(true);
  }

  const handleCloseSetEmployeeFlowDialogBox = () => {
    setOpenToggleDialogFlow(false);
  }

  const handleSubmitEmployeeFlow = () => {

    gogoEmployeeFlow();

    async function gogoEmployeeFlow(){
      
      setOpenSetEmployeeFlowSuccess(false);
      setOpenToggleDialogFlow(false);

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('Authorization', isToken);

      let response = await fetch('http://localhost:8080/api/add-employee-flow', {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          employee_number: employee_number,
          flow_id: checked
        })
      })

      if(response.status === 200){
        setEmployeeFlowResponse(await response.json());
        setOpenSetEmployeeFlowSuccess(true)
      }
    }
  }

  const handleCloseSetEmployeeFlowSuccess = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSetEmployeeFlowSuccess(false);
    setToggle_employee_number(false);
    setOpenSetEmployeeFlowSuccess(false);
    setEmployee_number('');
  }

  const handleLogout = () => {
    cookies.remove('token');
    navigate('/login')
  }

  const handleGoLogin = () => {
    navigate('/login');
  }

  const handleGoStation = () => {
    navigate('/station');
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h3" component="h6" style={{fontWeight: 'bold'}} gutterBottom>
          maxeon ape +
        </Typography>
        {
          isToken ? (
            <>
            <div style={{display:'flex'}}>
            <Button size="small" style={{marginRight: 8}} onClick={handleGoHome}><Typography variant="subtitle2" color="textPrimary" style={{textDecoration:'underline'}}>Home</Typography></Button>
            <Button size="small" style={{marginRight: 8}} onClick={handleGoStation}><Typography  variant="subtitle2" color="textSecondary">Station</Typography></Button>
            <Button size="small"style={{marginRight: 8}} onClick={handleLogout} style={{marginLeft: 'auto'}} ><Typography color="textSecondary"  variant="subtitle2">Logout</Typography></Button>
            </div>
            {!toggle_employee_number ? (
              <RegistrationForm employee_number={employee_number} handleEmployeeNumberOnChange={handleEmployeeNumberOnChange} handleSubmitRegister={handleSubmitRegister} />
            ):(
              <>
              <SetEmployeeFlow handleBackTohome={handleBackTohome} employeeData={employeeData} checked={checked} handleToggle={handleToggle} handleOpenSetEmployeeFlowDialogBox={handleOpenSetEmployeeFlowDialogBox} handleCloseSetEmployeeFlowDialogBox={handleCloseSetEmployeeFlowDialogBox} toggleOpenDialogFlow={toggleOpenDialogFlow}  handleSubmitEmployeeFlow={handleSubmitEmployeeFlow} employee_flow={employee_flow} />
              <Snackbar open={openSetEmployeeFlowSuccess} autoHideDuration={3000} onClose={handleCloseSetEmployeeFlowSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
                <Alert onClose={handleCloseSetEmployeeFlowSuccess} severity="success">
                  APE process flow has been successfully added!
                </Alert>
              </Snackbar>
              </>
            )}
            </>
          ):(
            <>
            <Typography variant="h6" gutterBottom style={{fontWeight: 'bold'}}>You are signed out.</Typography>
            <Button size="small"style={{marginRight: 8}} onClick={handleGoLogin} color="primary" variant="text" >Go to login</Button>
            </>
          )
        }
      </Box>
    </Container>
  );
}
