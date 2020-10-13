import React from 'react'
import { makeStyles, Container, Grid, Toolbar, TextField, } from '@material-ui/core';
import Contact from './Contact';
import DitailsPopup from './DitailsPopup';
import { withRouter } from 'react-router-dom';
import DeletePopup from './DeletePopup';


const useStyles = makeStyles((theme)=>({
  contactsList: {    
  }, 
  searchInput: {   
    marginTop: theme.spacing(2), 
    marginBottom: theme.spacing(5), 
    zIndex: theme.zIndex.drawer
  } 
}))
const ContactsList = ({contacts, deleteContact, editContact, match, history}) => {
  const classes = useStyles();
  const action = match.params.action;
  
  return (
    <>
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
    {action && <DitailsPopup 
    contacts={contacts} 
    editContact={editContact}   
    />}
    {action && <DeletePopup 
    contacts={contacts}
    deleteContact={deleteContact}
    />}
    </>
  )
}



export default withRouter(ContactsList);
