import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(state => !!state.authReducer.data)
  const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onChange"
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      alert("Не удалось авторизоваться!")
    }

    localStorage.setItem("token", data.payload.token)
  }
  isAuth && navigate("/")
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register('email', {required: "Укажите почту"})}
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          type="password"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', {required: "Укажите пароль"})}
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
