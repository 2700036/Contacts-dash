import { makeStyles } from '@material-ui/core';
import React from 'react';
import Header from './Header';
import Main from './Main';
import '../vendor/normalize.css'

const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',    
  }
}))

const App = () => {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
    <Header />
    <Main />
    </div>
  );
};

export default App;
