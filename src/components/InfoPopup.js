import React from 'react';
import { makeStyles, } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Slide from '@material-ui/core/Slide';
import deepOrange from '@material-ui/core/colors/deepOrange';
import green from '@material-ui/core/colors/green';
import {useDispatch, useSelector} from "react-redux";
import {closeInfoPopup} from '../actions';


const useStyles = makeStyles(theme=>({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  success: {
    color: green[700],
    width: theme.spacing(8),
    height: 'auto',
    margin: theme.spacing(6)
  },
  failed: {
    color: deepOrange[500],
    width: theme.spacing(8),
    height: 'auto',
    margin: theme.spacing(6)
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const InfoPopup = () => {
  const classes = useStyles();
  const infoPopupData = useSelector(state=>state.infoPopupData)
  const dispatch = useDispatch();
  const onClose = ()=>dispatch(closeInfoPopup())
  return (
    <>
      <Dialog
        open={!!infoPopupData}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent className={classes.content}>
          {infoPopupData == 'registered' ? (
            <>
              <CheckCircleIcon className={classes.success}/>
              <DialogContentText align="center" id='alert-dialog-slide-description'>
                Вы успешно зарегистрировались
              </DialogContentText>
              <DialogContentText align="center" id='alert-dialog-slide-description'>Теперь можете войти</DialogContentText>
            </>
          ) : (
            <>
              <HighlightOffIcon className={classes.failed}/>
              <DialogContentText align="center" id='alert-dialog-slide-description'>{infoPopupData}</DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary' autoFocus>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InfoPopup;
