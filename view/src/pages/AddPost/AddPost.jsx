import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { isAuthUser } from '../../redux/slices/auth';
import { Navigate,useNavigate,useParams } from 'react-router-dom';
import axios from '../../axios-queries';
import { set } from 'mongoose';

export const AddPost = () => {
  const {id} = useParams();
  const isEdit = id ? true : false;
  const navigate =useNavigate();
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageURL,setImageUrl] = React.useState('');
  const [isLoading,setLoading] = React.useState('');
  console.log(id);
  React.useEffect(()=>{
    if(id){
      axios.get(`/posts/${id}`).then(({data}) => {
        setText(data.text);
        setTitle(data.title);
        setImageUrl(data.imageURL);
        setTags(data.tags);
      })
    }
  },[])

  const imgRef = React.useRef(null)
  

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image',file);
      const {data} = await axios.post('/upload',formData);
      setImageUrl(data.url)
     
    } catch (error) {
      console.log(error);
      alert(error);
    } 
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);


  const handleSubmitForm = async () => {
      try {
        setLoading(true);
        const fields = {title,tags:tags.split(','),text,imageURL}
        const {data} = isEdit ? await axios.patch(`/posts/${id}`,fields) : await axios.post('/posts',fields);
        const ID = isEdit ? id : data._id;
        navigate(`/posts/${ID}`);
      } catch (error) {
        console.log(error);
      }
  }
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const isAthorized = useSelector(isAuthUser);
  if(!isAthorized){
    return <Navigate to='/'/>
  }

  
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={e => imgRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={imgRef} type="file" onChange={handleChangeFile} hidden />
      {imageURL && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageURL}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange = {e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField value={tags} onChange = {e => setTags(e.target.value)} classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button type='submit' onClick={handleSubmitForm} size="large" variant="contained">
          {isEdit ? "Редактировать" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};