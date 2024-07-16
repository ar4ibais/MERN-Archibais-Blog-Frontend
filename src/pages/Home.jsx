import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPopularPosts, fetchPosts, fetchTags } from '../redux/slices/posts';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const dispatch = useDispatch()
  const {posts, tags} = useSelector(state => state.postReducer)
  const userData = useSelector(state => state.authReducer.data)

  const [tabActive, setTabActive] = useState(0)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    if (tabActive) {
      dispatch(fetchPopularPosts())
    } else {
      dispatch(fetchPosts())
    }
    dispatch(fetchTags())
  }, [tabActive])
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tabActive} aria-label="basic tabs example">
        <Tab label="Новые" onClick={() => setTabActive(0)} />
        <Tab label="Популярные" onClick={() => setTabActive(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
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
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isLoading={isPostsLoading}
                isEditable={userData?._id === obj.user?._id}
              />
            ))
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
