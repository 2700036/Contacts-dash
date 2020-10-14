import React, { useState } from 'react';
import { makeStyles, Container, TextField, Typography, Button, Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import { Link as A } from '@material-ui/core';
import * as auth from '../auth';

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

const Login = ({ history, handleLogin }) => {
  const classes = useStyles();
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
      .catch((err) => console.log(err.error));
  };

  return (
    <>
      <Container className={classes.container} maxWidth='xs'>
        <Typography variant='h6' style={{ marginBottom: 40 }}>
          Авторизуйтесь
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
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
            <Typography>Не зарегистрированы?</Typography>
            <Link to='/signup' style={{ textDecoration: 'none' }}>
              <Typography color='primary'>Регистрация</Typography>
            </Link>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default withRouter(Login);
