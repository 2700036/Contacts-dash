import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Container, TextField, Typography, Button, Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as auth from '../auth';
import {useDispatch} from "react-redux";
import {setInfoPopupData, closeInfoPopup} from '../actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const Register = ({history, handleLogin}) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { handleSubmit, register, errors, watch } = useForm({
    mode: 'onChange',
  }); 
  const password = useRef({});
  password.current = watch("password", "");

  const fakeLogin = () => {
    auth.authorize('user@test.com', '123123123')
    .then((data) => {              
      if (data.token) {
        handleLogin('user@test.com');
        history.push('/');
      } 
    })    
  }

  const onSubmit = ({email, password}) => {    
    auth
    .register(email, password)
    .then((res) => {
      
      if (res.data) { 
        dispatch(setInfoPopupData("registered"))
        setTimeout(() => {
          dispatch(closeInfoPopup())
          history.push("/signin");
        }, 2000)
        
      } else {
        dispatch(setInfoPopupData(res.error))
        console.log(res);
      }
    });
  };

  useEffect(()=>{
    setTimeout(() => {
      setIsSnackbarOpen(true)
    }, 3000)
    
  }, [])


  return (
    <>
      <Container className={classes.container} maxWidth='xs'>
        <Typography variant='h5' style={{ marginBottom: 40 }}>
          Регистрация
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
            <Typography style={{ margin: 'auto'}} >Уже зарегистрированы?</Typography>
            <Link to='/signin' style={{ textDecoration: 'none', margin: 'auto' }}>
            <Typography  color='primary' >Войти</Typography>
            </Link>
            
          </Box>
        </form>
        <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={()=>setIsSnackbarOpen(false)}>
          <Button style={{textTransform: 'none'}} onClick={fakeLogin}>
        <Alert  severity="success">
          Пропустить регистрацию !
        </Alert>
          </Button>
      </Snackbar>
      </Container>
    </>
  );
};

export default withRouter(Register);
