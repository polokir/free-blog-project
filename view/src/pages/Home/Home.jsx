import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Post from '../../components/Post/Post'
import { useDispatch,useSelector } from "react-redux";
import { sortByPopular,sortByDate } from '../../redux/slices/posts';
import  TagsBlock  from '../../components/TagsBlock/TagsBlock';
import  CommentsBlock  from '../../components/CommentsBlock/CommentsBlock';
import { fetchPosts, fetchTags} from '../../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userOBJ = useSelector(state =>state.auth.data);
  const {posts ,tags} = useSelector(state =>state.posts);
 

  React.useEffect(()=>{
    dispatch(fetchPosts())
    dispatch(fetchTags());
  },[]);


  let isPostLoading = posts.status === "loading";
  let isTagsLoading = tags.status === "loading";
  const popularSortHandler = () => {
    dispatch(sortByPopular());
  }
  const dateSortHandler = () =>{
    dispatch(sortByDate());
  }

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Нові" onClick={dateSortHandler}  />
        <Tab label="Популярні"onClick={popularSortHandler}  />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj,index) => 
          isPostLoading ? (
          <Post key={index} isLoading={true}/>
          ) : (
                <Post
                _id={obj._id}
                title={obj.title}
                imageUrl={`http://localhost:4444${obj.imageURL}`}
                user={obj.user}
                createdAt={(new Date(obj.createdAt)).toDateString()}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable = { userOBJ?.userData._id === obj.user._id }
                />
              ),)}
            
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Тестовий коментар',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={isPostLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};