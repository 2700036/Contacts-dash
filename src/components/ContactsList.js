import React from 'react'
import { makeStyles, Container, Grid, Toolbar, TextField, } from '@material-ui/core';
import Contact from './Contact';


const useStyles = makeStyles((theme)=>({
  contactsList: {    
  }, 
  searchInput: {   
    marginTop: theme.spacing(2), 
    marginBottom: theme.spacing(5), 
    zIndex: theme.zIndex.modal-1
  } 
}))

const ContactsList = ({contacts}) => {
  const classes = useStyles();
  console.log(contacts)
  return (
    <Container >
       <Toolbar />
       <TextField  label="Поиск" fullWidth className={classes.searchInput}/>
      <Grid container className={classes.contactsList} spacing={1} >
        {contacts.map((contact, i)=>{
          return <Contact 
          key={contact.id} 
          contact={contact}
          />
        })}

      </Grid>
    </Container>
  )
}



export default ContactsList;
