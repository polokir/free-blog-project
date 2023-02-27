import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios-queries';

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async()=>{
    const {data} = await axios.get('/posts');
    return data;
});
const initialState={
    posts:{
        items:[],
        status:'loading',
    },
    tags:{
        items:[],
        status:'loading',
    }
};
export const fetchTags = createAsyncThunk('posts/fetchTags',async()=>{
    const {data} = await axios.get('/tags');
    return data;
});

export const fetchDeletePost = createAsyncThunk('posts/fetchDeletePost',async (id) => {
    const {data} = await axios.delete(`/posts/${id}`);
    return data;
})


const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchPosts.pending]:(state)=>{
            state.posts.status = "loading";
        },
        [fetchPosts.fulfilled]:(state,action)=>{
            state.posts.items = action.payload;
            state.posts.status = "loaded";
        },
        [fetchPosts.rejected]:(state)=>{
            state.posts.items = [];
            state.posts.status = "error";
        },

        [fetchTags.pending]:(state)=>{
            state.tags.status = "loading";
        },
        [fetchTags.fulfilled]:(state,action)=>{
            state.tags.items = action.payload;
            state.tags.status = "loaded";
        },
        [fetchTags.rejected]:(state)=>{
            state.tags.items = [];
            state.tags.status = "error";
        },

        [fetchDeletePost.pending]:(state,action)=>{
            state.posts.items = state.posts.items.filter(item => item._id !== action.meta.arg)
        },
    }
})

export const postReducer = postSlice.reducer;