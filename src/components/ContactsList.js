import React, { useState } from 'react';
import { makeStyles, Container, Grid, Fab, Toolbar, TextField, IconButton, Box } from '@material-ui/core';
import Contact from './Contact';
import DitailsPopup from './DitailsPopup';
import { withRouter } from 'react-router-dom';
import DeletePopup from './DeletePopup';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import deepOrange from '@material-ui/core/colors/deepOrange';
import AddPopup from './AddPopup ';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  searchInput: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    zIndex: theme.zIndex.drawer,
  },
  searchBox: {
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    right: '-10px',
    top: '50%',
    transform: 'translateY(-60%)',
    color: theme.palette.grey[500],
    zIndex: theme.zIndex.drawer + 1,
  },
  addButton: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(6),
    backgroundColor: deepOrange[500],
    color: 'white',
    '&:hover': {
      backgroundColor: deepOrange[300],
    },
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  },
}));
const ContactsList = ({ contacts, deleteContact, editContact, addContact, match, history }) => {
  const classes = useStyles();
  const action = match.params.action;
  const [searchWord, setSearchWord] = useState('');
  const handleSearch = () => {
    if (!searchWord) return contacts;
    return contacts.filter((el) => {
      return Object.values(el).some((v) => v.toString().toLowerCase().includes(searchWord.toLowerCase()));
    });
  };

  return (
    <>
      <Container className={classes.container}>
        <Toolbar />
        <Box className={classes.searchBox}>
          <TextField
            label='Поиск'
            fullWidth
            autoFocus
            className={classes.searchInput}
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <IconButton aria-label='close' className={classes.clearButton} onClick={() => setSearchWord('')}>
            <CloseIcon />
          </IconButton>
        </Box>
        {contacts.length ? (
          <Grid container spacing={1}>
            {handleSearch().map((contact, i) => {
              return <Contact key={contact.id} contact={contact} />;
            })}
          </Grid>
        ) : null}
        <Fab className={classes.addButton} onClick={() => history.push('./create')}>
          <AddIcon />
        </Fab>
      </Container>
      {action == 'details' && <DitailsPopup contacts={contacts} editContact={editContact} />}
      {action == 'delete' && <DeletePopup contacts={contacts} deleteContact={deleteContact} />}
      {action == 'create' && <AddPopup addContact={addContact} />}
    </>
  );
};

export default withRouter(ContactsList);
