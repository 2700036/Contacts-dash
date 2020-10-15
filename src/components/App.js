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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const App = () => {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [infoPopupData, setInfoPopupData] = useState(false)
  const history = useHistory();
  const closeInfoPopup = () => {
    setInfoPopupData(false)
  }
  const handleLogin = (email) => {
    setUserEmail(email);
    setLoggedIn(true);    
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
      setLoggedIn={setLoggedIn}
      loggedIn={loggedIn}
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

export default App;
