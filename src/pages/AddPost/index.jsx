import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios';

export const AddPost = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const isAuth = useSelector(state => !!state.authReducer.data)

  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState("")

  const inputFileRef = useRef(null)
  const isEditing = !!id

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      const {data} = await axios.post("/upload", formData)
      setImageUrl(data.url)
    } catch (error) {
      console.error(error);
      alert("Ошибка при загрузке файла")
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const fields = {
        title,
        imageUrl,
        tags: tags.split(", "),
        text
      }

      const {data} = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields)

      const _id = isEditing ? id : data._id

      navigate(`/posts/${_id}`)
    } catch (error) {
      console.error(error);
      alert("Ошибка при создании статьи")
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

  useEffect(() => {
    if (!isAuth) {
      navigate("/")
    }
    if (id) {
      axios.get(`/posts/${id}`)
        .then(({data}) => {
          setTitle(data.title)
          setTags(data.tags)
          setImageUrl(data.imageUrl)
          setText(data.text)
        })
        .catch(err => {
          console.error(err);
          alert("Ошибка при попытке редактирования статьи")
        })
    }
  }, [])

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth value={tags}
        onChange={e => setTags(e.target.value)} />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
