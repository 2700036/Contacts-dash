import React, {useState, useContext, useEffect} from 'react';
import {Link, Route} from 'react-router-dom'
import {  
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,  
  Toolbar,
} from '@material-ui/core';
import { JsonPlaceHolderContext } from './JsonPlaceHolderContext';
import MailIcon from '@material-ui/icons/Mail';
import ContactsList from './ContactsList';


const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 200,
    [theme.breakpoints.down('xs')]: {
      width: 50,
      overflow: 'hidden'
    },
  },
  drawer: {
    width: 200,
    [theme.breakpoints.down('xs')]: {
      width: 50,
    },
  },
  listItem: {
    textDecoration: 'none',
    color: 'inherit',
  }
}));

const Main = () => {
  const classes = useStyles();
  const jsonPlaceHolderApi = useContext(JsonPlaceHolderContext);
  const [contacts, setContacts] = useState([]);

  const handleDeleteContact = (contactId) => {
    const contactIdx = contacts.findIndex(({id})=>contactId == id);
    setContacts([...contacts.slice(0, contactIdx), ...contacts.slice(contactIdx+1, )])
  }
  const handleEditContact = (contactId, data) => {
    const contactIdx = contacts.findIndex(({id})=>contactId == id);
    const contact = contacts.find(({id})=>contactId == id);
    const newContact = {...contact, ...data};    
    setContacts([...contacts.slice(0, contactIdx), newContact, ...contacts.slice(contactIdx+1, )])
  };
  const handleAddContact = (data) => {
    setContacts([{id: contacts.length+1, ...data}, ...contacts])
  }


  useEffect(()=>{
    jsonPlaceHolderApi.getUsers()
    .then(contacts=>setContacts(contacts))
  }, [])

  return (
    <>
      <Drawer
        variant='permanent'
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <List>
            <Link to='/contacts/' className={classes.listItem}>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText >Контакты</ListItemText>
          </ListItem>
            </Link>
        </List>
      </Drawer>
      <Route path="/contacts/:action?/:id?">
      {
      contacts.length && <ContactsList 
      contacts={contacts} 
      deleteContact={handleDeleteContact}
      editContact={handleEditContact}
      addContact={handleAddContact}
      />
      }
      </Route>
      
    </>
  );
};

export default Main;
