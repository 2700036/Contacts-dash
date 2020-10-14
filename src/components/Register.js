import React, { useEffect, useRef, useState } from 'react';
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

const Register = ({history, setInfoPopupData, closeInfoPopup}) => {
  const classes = useStyles();
  const { handleSubmit, register, errors, watch } = useForm({
    mode: 'onChange',
  }); 
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = ({email, password}) => {    
    auth
    .register(email, password)
    .then((res) => {
      
      if (res.data) { 
        setInfoPopupData("registered")
        setTimeout(() => {
          closeInfoPopup()
          history.push("/signin");
        }, 2000)
        
      } else {
        setInfoPopupData(res.error)
        console.log(res);
      }
    });
  };


  return (
    <>
      <Container className={classes.container} maxWidth='xs'>
        <Typography variant='h5' style={{ marginBottom: 40 }}>
          Регистриция
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
            
            error={!!errors.password || !!errors.password_repeat}
            helperText={errors.password ? errors.password.message : (errors.password_repeat ? errors.password_repeat.message : null)}
          />
          <TextField
            autoComplete='off'
            inputRef={register({
              required: 'Это обязательное поле',
              validate: value =>
            value === password.current || "Пароли не совпадают"
            })}
            name='password_repeat'
            className={classes.input}
            label='Повторить пароль'
            type='password'
            
            error={!!errors.password_repeat}
            helperText={errors.password_repeat ? errors.password_repeat.message : null}
          />
          <Button type='submit' variant='contained' color='primary' style={{ margin: 40 }}>
            Отправить
          </Button>
          <Box className={classes.box}>
            <Typography >Уже зарегистрированы?</Typography>
            <Link to='/signin' style={{ textDecoration: 'none' }}>
            <Typography color='primary' >Войти</Typography>
            </Link>
            
          </Box>
        </form>
      </Container>
    </>
  );
};

export default withRouter(Register);
