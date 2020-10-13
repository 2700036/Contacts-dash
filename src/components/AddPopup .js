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
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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

const DitailsPopup = ({ addContact, match, history }) => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm({
    mode: 'onChange',
  });
  const open = match.params.action == 'create';

  const handleClose = () => history.push('/contacts/');

  const onSubmit = (data) => {
    addContact(data);
    handleClose();
  };

  return (
    <>
      <Dialog fullWidth={true} maxWidth={'sm'} open={!!open} onClose={handleClose} scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent className={classes.dialogContent}>
            <TextField
              inputRef={register({
                required: 'Это обязательное поле',
                minLength: {
                  value: 2,
                  message: 'Не менее 2 символов',
                },
                maxLength: {
                  value: 30,
                  message: 'Не более 30 символов',
                },
              })}
              name='name'
              margin='normal'
              className={`${classes.halfInput} ${classes.mb64}`}
              label='Имя'
              required
              autoComplete='off'
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : null}
            />
            <Box className={classes.box}>
              <TextField
                autoComplete='off'
                inputRef={register({
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Неверный формат почты',
                  },
                })}
                name='email'
                className={classes.halfInput}
                label='email'
                type='email'
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : null}
              />
              <TextField
                autoComplete='off'
                inputRef={register({
                  minLength: {
                    value: 6,
                    message: 'Не менее 2 символов',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов',
                  },
                })}
                name='phone'
                className={classes.halfInput}
                label='телефон'
                type='tel'
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : null}
              />
            </Box>
            <Box className={`${classes.box} ${classes.mb64}`}>
              <TextField
                autoComplete='off'
                inputRef={register({
                  pattern: {
                    value: /^[\S]+\.[\S]{2,7}$/,
                    message: 'Неверный формат сайта',
                  },
                  minLength: {
                    value: 5,
                    message: 'Не менее 5 символов',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов',
                  },
                })}
                name='website'
                className={classes.halfInput}
                label='Сайт'
                type='text'
                error={!!errors.website}
                helperText={errors.website ? errors.website.message : null}
              />
              <TextField
                autoComplete='off'
                inputRef={register({
                  minLength: {
                    value: 2,
                    message: 'Не менее 2 символов',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов',
                  },
                })}
                name='company'
                className={classes.halfInput}
                label='Компания'
                type='text'
                error={!!errors.company}
                helperText={errors.company ? errors.company.message : null}
              />
            </Box>
            <Typography paragraph>Адрес:</Typography>
            <Box className={`${classes.box}`}>
              <TextField
                autoComplete='off'
                inputRef={register({
                  minLength: {
                    value: 2,
                    message: 'Не менее 2 символов',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Не более 30 символов',
                  },
                })}
                name='city'
                className={classes.halfInput}
                label='Город'
                type='text'
                error={!!errors.city}
                helperText={errors.city ? errors.city.message : null}
              />
              <TextField
                autoComplete='off'
                inputRef={register({
                  pattern: {
                    value: /^[\d-]+$/,
                    message: 'Неверный формат индекса',
                  },
                  minLength: {
                    value: 5,
                    message: 'Не менее 5 символов',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Не более 15 символов',
                  },
                })}
                name='zipcode'
                className={classes.halfInput}
                label='Индекс'
                type='text'
                error={!!errors.zipcode}
                helperText={errors.zipcode ? errors.zipcode.message : null}
              />
            </Box>
            <TextField
              autoComplete='off'
              inputRef={register({
                minLength: {
                  value: 2,
                  message: 'Не менее 2 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'Не более 40 символов',
                },
              })}
              name='street'
              className={classes.fullInput}
              label='Улица, дом, корп.'
              type='text'
              error={!!errors.street}
              helperText={errors.street ? errors.street.message : null}
            />
            <TextField
              autoComplete='off'
              inputRef={register({
                maxLength: {
                  value: 15,
                  message: 'Не более 15 символов',
                },
              })}
              name='suite'
              className={classes.halfInput}
              label='Офис, помещение'
              type='text'
              error={!!errors.suite}
              helperText={errors.suite ? errors.suite.message : null}
            />
            <Box className={`${classes.box}`}></Box>
          </DialogContent>
          <DialogActions>
            <Button color='primary' type='submit' autoFocus >
              Сохранить
            </Button>
            <Button
                color='secondary'
                onClick={handleClose}
              >
                Закрыть
              </Button>            
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default withRouter(DitailsPopup);
