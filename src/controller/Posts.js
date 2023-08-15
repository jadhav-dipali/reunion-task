const Post = require("../model/postSchema");
require("dotenv").config();
const SECRATE_KEY = process.env.SECRATE_KEY;
const jwt = require("jsonwebtoken");


const PostData = async(req, res)=>{
    try {
        if(req.headers.authorization){
        let userVar = await jwt.verify(req.headers.authorization , SECRATE_KEY);
            if(userVar){
            const data = new Post({  userId:userVar._id,...req.body });
            const createData = await data.save();
            res.status(201).json({status:"success"  ,  data:createData});
            }
      }else{
        res.status(401).json({status:"fail"  , message:"user Not Othorised"});
      }
    } catch (err) {
        res.status(400).json({status:"fail"  , message:err.message});
    }
}

const DeleteData = async(req, res)=>{
  try{
    if(req.headers.authorization){
      let userVar = await jwt.verify(req.headers.authorization , SECRATE_KEY);
      const _id = req.params.id;
      const post = await Post.findById(_id);
      if(post.userId===userVar._id){
        const deletePost = await Post.findByIdAndDelete(_id);
        res.status(200).json({status:"Success" , message:"Delete Post Sucessfully", deleteData:deletePost })
      }else{
        res.status(401).json({status:"fail" , message:"Your not Othorised User for delete this post"})
      }
    }else{
      res.status(401).json({status:"fail"  , message:"user Not Othorised"});
    }
  }catch(err){
    res.status(400).json({status:"fail" , message:err.message})
  }
}

const getAllPost = async (req, res)=>{
  try {
    if(req.headers.authorization){
      const data = await Post.find();
      res.status(200).json({status:"success" , data:data});
    }else{
      res.status(401).json({status:"fail"  , message:"user Not Othorised"});
    }
  } catch (err) {
    res.status(400).json({status:"fail" , message:err.message})
  }
}

const getPostById =async (req, res)=>{
  try {
    if(req.headers.authorization){
      const _id = req.params.id;
      const data = await Post.findById(_id);
      res.status(200).json({status:"success" , data:data});
    }else{
      res.status(401).json({status:"fail"  , message:"user Not Othorised"});
    }
  } catch (err) {
    res.status(400).json({status:"fail" , message:err.message})
  }
}


const likePost = async(req, res)=>{
  try{
    if(req.headers.authorization){
      let userVar = await jwt.verify(req.headers.authorization , SECRATE_KEY);
      const _id = req.params.id;
      const post = await Post.findById(_id);
      const foundId = post.likes.find(ele=>ele===userVar._id)
      if(!foundId){
        const updateLike = await Post.findByIdAndUpdate(_id , {$push:{likes:userVar._id}} ,{new:true});
        res.status(201).json({status:"Success" , message:"like add", update:updateLike})
      }else{
        res.status(400).json({status:"fail" , message:"You`ve already like this post"})
      }
    }else{
      res.status(401).json({status:"fail"  , message:"user Not Othorised"});
    }
  }catch(err){
    res.status(400).json({status:"fail" , message:err.message})
  }
}

const unlikePost = async(req, res)=>{
  try{
    if(req.headers.authorization){
      let userVar = await jwt.verify(req.headers.authorization , SECRATE_KEY);
      const _id = req.params.id;
      const post = await Post.findById(_id);
      const foundId = post.likes.find(ele=>ele===userVar._id)
      if(foundId){
        const updateLike = await Post.findByIdAndUpdate(_id , {$pull:{likes:userVar._id}} ,{new:true});
        res.status(200).json({status:"Success" , message:"like remove", update:updateLike})
      }else{
        res.status(400).json({status:"fail" , message:"You`ve not liked this post , like this post"})
      }
    }else{
      res.status(401).json({status:"fail"  , message:"user Not Othorised"});
    }
  }catch(err){
    res.status(400).json({status:"fail" , message:err.message})
  }
}


const commentPost = async (req, res) => {
 try {
  if(req.headers.authorization){
    let userVar = await jwt.verify(req.headers.authorization , SECRATE_KEY);
    const _id = req.params.id;
    const post = await Post.findById(_id);
    if(post){
      const comment = await Post.findByIdAndUpdate(_id , {$push:{comment:{message:req.body.comment.message, userId :userVar._id}}} ,{new:true});
      res.status(201).json({status:"Success" , message:"Comment add", updatedData:comment})
    }else{
      res.status(400).json({status:"fail" , message:"post not found"})
    }
  }else{
    res.status(401).json({status:"fail"  , message:"user Not Othorised"});
  }
    }catch (err) {
        res.status(400).json({status:"fail" , message:err.message})
  }
}





module.exports = {PostData , DeleteData , getAllPost , getPostById , likePost , unlikePost , commentPost}