import React, { Component } from 'react';
import { AppBar, Box, Button, Container, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme)=>({

  menuButton: {
    marginRight: 'auto',
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

export const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Container fixed>
        <Toolbar>
          <IconButton  color='inherit' aria-label='menu' className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          {/* <Typography variant='h6' className={classes.title} >Dashboard</Typography>          */}
            <Button edge='end' color='inherit' variant='outlined'>
              Log In
            </Button>        
        </Toolbar>
      </Container>
    </AppBar>
  )
}


export default Header;
