import Container from "@mui/material/Container";
import Header from './components/Header/Header'
import { Home } from "./pages/Home/Home";
import {FullPost} from './pages/FullPost/FullPost'
import {AddPost} from './pages/AddPost/AddPost'
import Login from './pages/Login/Login'
import {Registration} from './pages/Registration/Registration'
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe,isAuthUser } from "./redux/slices/auth";
import React from "react";

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthUser);
  console.log("authorization in app.js",isAuth);

  React.useEffect(()=>{
    dispatch(fetchAuthMe());
  },[]);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/posts/:id" element={<FullPost/>}/>
        <Route path="/posts/:id/edit" element={<AddPost/>}/>
        <Route path="/add-post" element={<AddPost/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
       </Routes>
      </Container>
    </>
  );
}

export default App;