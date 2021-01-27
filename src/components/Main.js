import React, {useContext, useEffect} from 'react';
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
import withProtectedRoute from './hocs/withProtectedRoute';
import Dashboard from './Dashboard';
import { contactsLoaded } from '../actions';
import { connect } from 'react-redux';
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import Parser from './Parser/Parser';


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

const Main = ({contacts, setContacts}) => {
  const classes = useStyles();
  const jsonPlaceHolderApi = useContext(JsonPlaceHolderContext);

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
            <Link to='/parser' className={classes.listItem}>
          <ListItem button>
            <ListItemIcon>
              <TextRotationNoneIcon />
            </ListItemIcon>
            <ListItemText >Парсер</ListItemText>
          </ListItem>
            </Link>
        </List>
      </Drawer>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/contacts/:action?/:id?">
      {
      contacts && <ContactsList />
      }
      </Route>
      <Route path="/parser" component={Parser}/>
      
    </>
  );  
};

const mapStateToProps = ({contacts}) => ({
  contacts
})

const mapDispatchToProps = {
  setContacts: contactsLoaded
}

export default withProtectedRoute(connect(mapStateToProps, mapDispatchToProps)(Main));

