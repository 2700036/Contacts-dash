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
  },

  drawer: {
    width: 200,
  },
}));

const Main = () => {
  const classes = useStyles();
  const jsonPlaceHolderApi = useContext(JsonPlaceHolderContext);
  const [contacts, setContacts] = useState([]);

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
            <Link to='/contacts'>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>Контакты</ListItemText>
          </ListItem>
            </Link>
        </List>
      </Drawer>
      <Route path="/contacts/:id?">
      {
      contacts.length && <ContactsList contacts={contacts} />
      }
      </Route>
      
    </>
  );
};

export default Main;
