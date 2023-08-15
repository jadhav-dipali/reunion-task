const Register = require("../model/UserRegister");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRATE_KEY = process.env.SECRATE_KEY;

const PostUser =  async(req,res)=>{
    try{
        let strongPass = await bcrypt.hash(req.body.password , 10)//
        let data1 = new Register({name:req.body.name,
            email:req.body.email,
            password: strongPass
        })
     let createData = await data1.save();
     res.status(201).json({status:"success" , data:createData});
    }catch(err){
        res.status(400).json({status:"fail" , message:err.message});
    }
}


const loginUser = async(req, res)=>{
    try{
        let user = await Register.findOne({email:req.body.email})//
        if(user){
            let matchPass = await bcrypt.compare(req.body.password, user.password)//true
            if(matchPass){
              const token = await jwt.sign({_id:user._id}, SECRATE_KEY);
              res.status(200).json({status:"success" , token:token})
            }else{
                res.status(401).json({status:"fail" , message:"User Details Not Match"})
            }
        }else{
            res.status(401).json({status:"fail" , message:"User not found"});
        }
    
    }catch(err){
        res.status(400).json({status:"fail",message:err.message});
    }
}


const followUser = async(req, res)=>{
    try{
      if(req.headers.authorization){
        let userVar = await jwt.verify(req.headers.authorization , SECRATE_KEY);
        const _id = req.params.id;
        const user = await Register.findById(_id);
        const foundId = user.follow.find(ele=>ele===userVar._id)
        if(!foundId){
          const updateFollow = await Register.findByIdAndUpdate(_id , {$push:{follow:userVar._id}} ,{new:true});
          res.status(201).json({status:"Success" , message:"your Follow this User", update:updateFollow})
        }else{
        //   const updateLike = await Posts.findByIdAndUpdate(_id , {$pull:{likes:userVar._id}} ,{new:true});
          res.status(400).json({status:"fail" , message:"you already follow this user"})
        }
      }
    }catch(err){
      res.status(400).json({status:"fail" , message:err.message})
    }
  }

  const unFollowUser = async(req, res)=>{
    try{
      if(req.headers.authorization){
        let userVar = await jwt.verify(req.headers.authorization , SECRATE_KEY);
        const _id = req.params.id;
        const user = await Register.findById(_id);
        const foundId = user.follow.find(ele=>ele===userVar._id)
        if(foundId){
          const updateunfollow = await Register.findByIdAndUpdate(_id , {$pull:{follow:userVar._id}} ,{new:true});
          res.status(201).json({status:"Success" , message:"your umFollow this User", update:updateunfollow})
        }else{
          res.status(400).json({status:"fail" , message:"your not follow this user , you can`t unfollow this user"})
        }
      }
    }catch(err){
      res.status(400).json({status:"fail" , message:err.message})
    }
  }

  const getUser = async (req, res)=>{
    try {
        if(req.headers.authorization){
            let userVar = await jwt.verify(req.headers.authorization , SECRATE_KEY);
            const user = await Register.findById(userVar._id);
            res.status(200).json({status:"success" , data:user})
            
        }else{
            res.status(401).json({status:"fail" , message:"not authanticate User"});
        }
    } catch (err) {
        res.status(400).json({status:"fail" , message:err.message})
    }
  }



module.exports = {PostUser , loginUser,followUser , unFollowUser , getUser}