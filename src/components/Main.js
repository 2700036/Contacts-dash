import React, {useState, useContext, useEffect} from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
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
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>Контакты</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      {
      contacts.length && <ContactsList contacts={contacts} />
      }
      <DitailsPopup />
    </>
  );
};

export default Main;
