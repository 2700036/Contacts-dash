import '../vendor/normalize.css';
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import * as auth from '../auth';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoPopup from './InfoPopup';
import { connect } from 'react-redux';
import {login} from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const App = ({loggedIn, login}) => {
  const classes = useStyles();
  
  const [userEmail, setUserEmail] = useState(null);
  const [infoPopupData, setInfoPopupData] = useState(false)
  const history = useHistory();
  const closeInfoPopup = () => {
    setInfoPopupData(false)
  }
  const handleLogin = (email) => {
    setUserEmail(email);
    login();    
  }

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {      
      auth.checkToken(jwt)
      .then((res) => { 
        handleLogin(res.data.email);
        history.push('/');
      })
    };
}
  useEffect(()=>{
    handleTokenCheck();
  }, [loggedIn])

  return (
    <div className={classes.root}>
      <Header 
      userEmail={userEmail}      
      />      
      <Switch>
        <Route path='/signin'>
          <Login 
          handleLogin={handleLogin}
          setInfoPopupData={setInfoPopupData}          
          />
        </Route>
        <Route  path='/signup'>
          <Register 
          setInfoPopupData={setInfoPopupData}
          closeInfoPopup={closeInfoPopup}
          handleLogin={handleLogin}
          />
        </Route>        
          <Main 
          path='/'
          loggedIn={loggedIn}
          />        
      </Switch>
      {infoPopupData && 
      <InfoPopup 
      infoPopupData={infoPopupData}
      closeInfoPopup={closeInfoPopup}
      />
      }
    </div>
  );
};

const mapStateToProps = ({loggedIn}) => ({
  loggedIn
})

const mapDispatchToProps = {
  login 
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
