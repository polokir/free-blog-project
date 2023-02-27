import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser,isSuccessRegister } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isSuccess = useSelector(isSuccessRegister);
  const {register,handleSubmit,setError} = useForm({
    defaultValues:{
      email:'',
      fullName:'',
      password:''
    },
    mode:'onChange'
  })
  const dispatch = useDispatch();

  const handleRegistration = async (values) => {
    const data = await dispatch(registerUser(values));
    console.log(data);
  }

  if(isSuccess){
    return <Navigate to='/'/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(handleRegistration)} action="">
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField {...register('fullName',{required:'Укажите имя'})} className={styles.field} label="Полное имя" fullWidth />
        <TextField {...register('email',{required:'Укажите почту'})} className={styles.field} label="E-Mail" fullWidth />
        <TextField {...register('password',{required:'Укажите пароль'})} className={styles.field} label="Пароль" fullWidth />
        <Button type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};