import express from 'express';
import mongoose from 'mongoose';
import {registerValid,loginValidation, postCreateValid} from './validations/validation.js';
import checkAuth from './utils/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';
import { createPost, deletePost, getAllPosts, getMyPosts, getOne, updatePost, getLastTags } from './controllers/PostController.js';
import multer from 'multer';
import cors from 'cors';

const app =express();
app.use(express.json());
app.use('/uploads',express.static('uploads'))
app.use(cors());
mongoose.connect('mongodb+srv://admin:admin123@cluster0.9r87nmj.mongodb.net/blog?retryWrites=true&w=majority')
    .then(()=>console.log("DB connected"))
    .catch((err)=>console.log('DB connection ERROR',err));



const storage = multer.diskStorage({
    destination:(_,__,call)=>{
        console.log("-----Показываю меестоположение папки Аплоудс----");
        call(null,'uploads');
    },
    filename:(_,file,call)=>{
        console.log("-----Делаю файл в папке Аплоудс----");
        call(null,file.originalname);
    },
});



const upload = multer({storage});

//------------User routing---------
app.post('/auth/login',loginValidation,login);

app.post('/auth/register',registerValid,register);

app.get('/auth/me',checkAuth,getMe);
//---------------------------------



//-----------Post routing----------
app.post('/posts',checkAuth,postCreateValid,createPost);

app.get('/posts',getAllPosts);

app.get('/posts/me',checkAuth,getMyPosts);

app.get('/posts/:id',getOne);

app.delete('/posts/:id', checkAuth,deletePost);

app.patch('/posts/:id', checkAuth,updatePost);

app.get('/tags',getLastTags);
//---------------------------------

//---------Upload-----------------
app.post('/upload',checkAuth,upload.single('image'),(req,res)=>{
    console.log("-----Oтправляю в папку Аплоудс----", req.file.originalname)
    res.json({
        url: `${req.file.originalname}`
    });
});
//---------------------------------



app.listen(4444,(err)=>{
    return err ? console.log(err) : console.log("Server OK")
})