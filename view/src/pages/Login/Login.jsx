import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import styles from "./Login.module.scss";
import { fetchUserData,isAuthUser } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

const Login = () => {

  const isAuth = useSelector(isAuthUser);
  const {register,handleSubmit,setError,formState:{errors,isValid}} = useForm({
    defaultValues:{
      email:'',
      password:'',
    },
    mode:'onChange'
  })
  const dispatch = useDispatch();

  const onSubmitForm = async (values) =>{
    const data = await dispatch(fetchUserData(values));
    if("token" in data.payload){
      window.localStorage.setItem('token',data.payload.token);
    }else{
      alert('Something wrong');
    }
  }
  if(isAuth){
    return <Navigate to='/'/>
  }
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід в акаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmitForm)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        {...register('email',{required:'Укажіть пошту'})}
        helperText={errors.email?.message}
        fullWidth
      />
      <TextField   error={Boolean(errors.password?.message)} helperText={errors.password?.message} {...register('password',{required:"parol"})} className={styles.field} label="Пароль" fullWidth />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Увійти
      </Button>
      </form>
    </Paper>
  );
};
export default Login;