import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  makeStyles,
  Box,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';



const useStyles = makeStyles((theme) => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  fullInput: {
    marginBottom: theme.spacing(2),
  },
  halfInput: {
    marginBottom: theme.spacing(2),
    width: '47%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  box: {
    justifyContent: 'Space-between',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  mb64: {
    marginBottom: theme.spacing(6),
  },
}));

const DitailsPopup = ({contact, handleClose}) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  
  const {name, email, phone, website, company, 
    address: { street, suite, city, zipcode }} = contact;

  const isReadOnly = () => {
    return !isEdit ? { readOnly: true } : { readOnly: false };
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={!!contact}
        onClose={handleClose}
      >
        <form onSubmit={isEdit ? () => setIsEdit(false) : () => console.log(123)}>
          <DialogContent className={classes.dialogContent}>
            <TextField
              margin='normal'
              className={`${classes.halfInput} ${classes.mb64}`}
              label='Имя'
              defaultValue={name}
              InputProps={isReadOnly()}
              required
            />
            <Box className={classes.box}>
              <TextField
                className={classes.halfInput}
                label='email'
                type='email'
                defaultValue={email}
                InputProps={isReadOnly()}
              />
              <TextField
                className={classes.halfInput}
                label='телефон'
                type='tel'
                defaultValue={phone}
                InputProps={isReadOnly()}
              />
            </Box>
            <Box className={`${classes.box} ${classes.mb64}`}>
              <TextField
                className={classes.halfInput}
                label='Сайт'
                type='text'
                defaultValue={website}
                InputProps={isReadOnly()}
              />
              <TextField
                className={classes.halfInput}
                label='Компания'
                type='text'
                defaultValue={company.name}
                InputProps={isReadOnly()}
              />
            </Box>
            <Typography paragraph>Адрес:</Typography>
            <Box className={`${classes.box}`}>
              <TextField
                className={classes.halfInput}
                label='Город'
                type='text'
                defaultValue={city}
                InputProps={isReadOnly()}
              />
              <TextField
                className={classes.halfInput}
                label='Индекс'
                type='text'
                defaultValue={zipcode}
                InputProps={isReadOnly()}
              />
            </Box>
            <TextField
              className={classes.fullInput}
              label='Улица, дом, корп.'
              type='text'
              defaultValue={street}
              InputProps={isReadOnly()}
            />
            <TextField
              className={classes.halfInput}
              label='Офис, помещение'
              type='text'
              defaultValue={suite}
              InputProps={isReadOnly()}
            />
            <Box className={`${classes.box}`}></Box>
          </DialogContent>
          <DialogActions>
            {!isEdit && (
              <Button
                color='primary'
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                Изменить
              </Button>
            )}
            <Button color='primary' autoFocus type='submit'>
              {isEdit ? 'Сохранить' : 'Закрыть'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default DitailsPopup;
