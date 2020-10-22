import React from 'react';
import { AppBar, Button, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';

import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../actions';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: 'auto',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 5,
  },
}));

export const Header = ({ userEmail, logout, loggedIn, history }) => {
  const classes = useStyles();
  const handleLogout = () => {
    logout();
    localStorage.removeItem('jwt');
    history.push('/signin');
  };
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Container fixed>
        <Toolbar>
          {loggedIn && userEmail && (
            <Typography variant='h6' className={classes.title}>
              {userEmail}
            </Typography>
          )}
          {loggedIn && (
            <Button
              edge='end'
              color='inherit'
              variant='outlined'
              className={classes.menuButton}
              onClick={handleLogout}
            >
              ВЫЙТИ
            </Button>
          )}
          <Route path='/signin'>
            <Button
              edge='end'
              color='inherit'
              variant='outlined'
              className={classes.menuButton}
              onClick={() => history.push('/signup')}
            >
              РЕГИСТРАЦИЯ
            </Button>
          </Route>
          <Route path='/signup'>
            <Button
              edge='end'
              color='inherit'
              variant='outlined'
              className={classes.menuButton}
              onClick={() => history.push('/signin')}
            >
              ВОЙТИ
            </Button>
          </Route>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = ({loggedIn}) => ({
  loggedIn
})

const mapDispatchToProps = {  
  logout
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
