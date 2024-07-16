import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/Post';
import { fetchPostsByTag } from '../../redux/slices/posts'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const PostsByTag = () => {
  const {tag} = useParams()
  console.log(tag);
  const dispatch = useDispatch()
  const {posts} = useSelector(state => state.postReducer)
  const userData = useSelector(state => state.authReducer.data)
  const isPostsLoading = posts.status === 'loading'

  useEffect(() => {
    dispatch(fetchPostsByTag(tag))
  }, [])
  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
        <h1 style={{textAlign: 'center'}}>Найденные посты по тэгу "{tag}"</h1>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => (
            (isPostsLoading ? <Post key={index} isLoading={isPostsLoading} /> : (
              <Post
                key={obj._id}
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={0}
                tags={obj.tags}
                isLoading={isPostsLoading}
                isEditable={userData?._id === obj.user?._id}
              />
            ))
          ))}
        </Grid>
      </Grid>
    </>
  );
};
