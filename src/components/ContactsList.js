import React from 'react'
import { makeStyles, Container, Grid, Toolbar, } from '@material-ui/core';
import Contact from './Contact';


const useStyles = makeStyles((theme)=>({

  contactsList: {
    flexShrink: 2,
    padding: theme.spacing(3),
  },  
}))

const ContactsList = ({contacts}) => {
  const classes = useStyles();
  console.log(contacts)
  return (
    <Container >
       <Toolbar />
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
