const mongoose = require("mongoose");

const postSchema= mongoose.Schema({
    title:{
           type:String,
           require:true
       },
       description:{
           type:String,
           require:true,
       },
      comment:{
        type:[Object]
      },
       likes:{
        type:[String]
       },
       created_at:{
        type:String,
        default:(new Date().toLocaleDateString())
       },
       userId:{
        type:String
       }
      
});

const Post = new mongoose.model("Post" ,postSchema);
module.exports = Post;