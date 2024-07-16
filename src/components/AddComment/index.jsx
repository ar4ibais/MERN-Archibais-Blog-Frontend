import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { fetchComments } from "../../redux/slices/comments";

export const AddComment = ({postId}) => {
  const userData = useSelector(state => state.authReducer.data)
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      await axios.post(`/posts/${postId}/comments`, {
        text
      });
      dispatch(fetchComments(postId));
      setText("");
    } catch (error) {
      console.error('Не удалось добавить комментарий:', error);
    }
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={userData.avatarUrl ? userData.avatarUrl : ""}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" onClick={onSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
