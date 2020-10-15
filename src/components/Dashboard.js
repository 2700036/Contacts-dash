import React, { useState } from 'react'
import { makeStyles, Container, Toolbar, Box, Typography} from '@material-ui/core';
import Contact from './Contact';


const useStyles = makeStyles((theme)=>({
  container: { 
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',   
  }, 
  
}))
const Dashboard = ({contacts, deleteContact, editContact, addContact, match, history}) => {
  const classes = useStyles();
  
  
  return (
    
    <Container className={classes.container}>
       <Typography variant="body1" align="center">Тут может быть дашборд с информацией обо всех модулях.</Typography>
       <Typography variant="body1" align="center" paragraph>Сейчас реализован только модуль с контактами.</Typography>
       <Typography variant="body1" align="center">Выберите его</Typography>
    </Container>   
   
  )
}



export default Dashboard;