import React from "react";
import { useParams } from "react-router-dom";
import  Post  from "../../components/Post/Post";
import  AddComment  from "../../components/AddComment/AddComent";
import  CommentsBlock  from "../../components/CommentsBlock/CommentsBlock";
import axios from "../../axios-queries";

export const FullPost = () => {
  const [data,setData] = React.useState();
  const [isLoading,setLoading] = React.useState(true);
  const params = useParams();
  console.log("params",params);
  console.log( axios.get(`/posts/${params.id}`))

  React.useEffect(() =>{
    axios.get(`/posts/${params.id}`).then(res => {
      console.log(res.data)
      setData(res.data);
      setLoading(false);
    }).catch(err =>console.log(err));
  },[]);
  
  if(isLoading){
    return <Post isLoading={isLoading}/>
  }
  console.log("fullpost",data)

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:4444${data.imageURL}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};