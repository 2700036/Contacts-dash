import React from 'react';
import { makeStyles, Container, TextField, Typography, Button, Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth';
import {useDispatch} from "react-redux";
import {setInfoPopupData} from '../actions';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  box: {
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
  },
}));
  const mapErrCodeToMessage = {
    401: 'Неверный логин или пароль'
  }

const Login = ({ history, handleLogin }) => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const { handleSubmit, register, errors } = useForm({
    mode: 'onChange',
  });

  const onSubmit = ({ email, password }) => {    
    auth
      .authorize(email, password)
      .then((data) => {              
        if (data.token) {
          handleLogin(email);
          history.push('/');
        } 
      })
      .catch((err) => {
        dispatch(setInfoPopupData(mapErrCodeToMessage[err.error]))
        console.log(err)
      });
  };

  return (
    <>
      <Container className={classes.container} maxWidth='xs'>
        <Typography variant='h5' style={{ marginBottom: 40 }}>
          Авторизация
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField autoFocus
            autoComplete='off'
            inputRef={register({
              required: 'Это обязательное поле',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат почты',
              },
            })}
            name='email'
            className={classes.input}
            label='Email'
            type='email'
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : null}
          />
          <TextField
            autoComplete='off'
            inputRef={register({
              required: 'Это обязательное поле',
              minLength: {
                value: 8,
                message: 'Не менее 8 символов',
              },
              maxLength: {
                value: 15,
                message: 'Не более 15 символов',
              },
            })}
            name='password'
            className={classes.input}
            label='Пароль'
            type='password'
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : null}
          />
          <Button type='submit' variant='contained' color='primary' style={{ margin: 40 }}>
            Войти
          </Button>
          <Box className={classes.box}>
            <Typography style={{ margin: 'auto'}}>Не зарегистрированы?</Typography>
            <Link to='/signup' style={{ textDecoration: 'none', margin: 'auto' }}>
              <Typography color='primary'>Регистрация</Typography>
            </Link>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default withRouter(Login);
