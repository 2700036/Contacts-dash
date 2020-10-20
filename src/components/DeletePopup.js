import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteContact } from '../actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeletePopup = ({match, history, deleteContact}) => {  
  const open = match.params.action == 'delete';  
  const handleClose = () => history.push('/contacts/');
  const handleDelete = ()=>{
    deleteContact(match.params.id);
    handleClose()
  }
  
  return (
    <>      
      <Dialog
        open={!!open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Вы уверены?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Востановить удалённый контакт будет невозможно.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            Удалить
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  deleteContact
}


export default withRouter( connect(mapStateToProps, mapDispatchToProps)(DeletePopup) );