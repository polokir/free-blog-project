import  PostModel  from "../models/Post.js";


export const createPost = async (req,res) =>{
    const {title,text,tags,imageURL} = req.body
    try {
       const doc  = new PostModel({
        title:title,
        text:text,
        tags:tags,
        imageURL:imageURL,
        user:req.userId
       });
       const post = await doc.save();

       res.json(post);
    } catch (error) {   
        console.log(error);
        res.status(500).json({
            message:"НЕ УДАЛОСЬ ОТПРАВИТЬ ПОСТ"
        });
    }
}

export const getAllPosts = async (req,res) =>{
    try {
        const posts = await PostModel.find();
        console.log("GET POST DONE\n",posts);
        res.json(posts)
    } catch (error) {
        console.log(error);
    }
}

export const getMyPosts = async (req,res)=>{
    try {
        const posts = await PostModel.find({user:req.userId});
        res.json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const getOne = async (req,res) =>{
    try {
        const postId = req.params.id
        PostModel.findOneAndUpdate({
            _id:postId,
        },{
            $inc: {viewsCount:1}
        },{
            returnDocument:'after'
        },(err,doc) =>{
            if(err){
                console.log(err);
               return res.status(500).json({message:"Update failed"});
            }
            if(!doc){
                return res.status(404).json({message:"Not found"});
            }

            res.json(doc);
        });
    } catch (error) {
        console.log(error);
    }
}


export const deletePost = async (req,res) =>{
    try {
        const postId = req.params.id
       PostModel.findByIdAndDelete({
        _id:postId
       },(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(500).json({message:"Remove failed"});
        }if(!doc){
            return res.status(404).json({message:"Not found"});
        }
        res.json({
            success:true,
        })
       });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = async (req,res) =>{
    const {title,text,tags,imageURL} = req.body
    try {
        const postId = req.params.id
        
        await PostModel.updateOne({
            _id:postId
        },{
            title:title,
            text:text,
            tags:tags,
            imageURL:imageURL,
            user:req.userId
        });
        res.json({
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Not updated"
        })
    }
}