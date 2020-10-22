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
import { login, updateUserEmail, setInfoPopupData } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const App = ({ loggedIn, userEmail, handleLogin, infoPopupData }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        handleLogin(res.data.email);
        history.push('/');
      });
    }
  };
  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  return (
    <div className={classes.root}>
      <Header userEmail={userEmail} />
      <Switch>
        <Route path='/signin'>
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path='/signup'>
          <Register handleLogin={handleLogin} />
        </Route>
        <Main path='/' />
      </Switch>
      {infoPopupData && <InfoPopup />}
    </div>
  );
};

const mapStateToProps = ({ loggedIn, userEmail, infoPopupData }) => ({
  loggedIn,
  userEmail,
  infoPopupData,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => {
    dispatch(updateUserEmail(email));
    dispatch(login());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
