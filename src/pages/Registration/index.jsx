import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchRegister } from '../../redux/slices/auth';

export const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(state => !!state.authReducer.data)
  const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: "onChange"
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      alert("Не удалось зарегестрироваться!")
    }

    localStorage.setItem("token", data.payload.token)
    navigate("/")
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          className={styles.field} 
          label="Полное имя" 
          fullWidth 
          error={!!errors.fullName?.message}
          helperText={errors.fullName?.message}
          {...register('fullName', {required: "Укажите Ваше полное имя"})}
        />
        <TextField 
          className={styles.field} 
          label="Ссылка на вашу аватарку" 
          fullWidth 
          error={!!errors.avatarUrl?.message}
          helperText={errors.avatarUrl?.message}
          {...register('avatarUrl')}
        />
        <TextField 
          type="email"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register('email', {required: "Укажите почту"})}
          className={styles.field} 
          label="E-Mail" 
          fullWidth 
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          type="password"
          fullWidth 
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', {required: "Укажите пароль"})}
        />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
