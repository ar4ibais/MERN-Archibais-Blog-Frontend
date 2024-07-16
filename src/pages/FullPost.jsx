import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../redux/slices/comments";

export const FullPost = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState("true")
  const {id} = useParams()

  const {items, status} = useSelector(state => state.commentReducer)
  const isAuth = useSelector(state => !!state.authReducer.data)

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch(e => {
        console.warn(e)
        alert("Не удалось получить статью")
      })

    dispatch(fetchComments(id))
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={items}
        isLoading={status === 'loading'}
      >
        {isAuth && <AddComment postId={id} />}
      </CommentsBlock>
    </>
  );
};
