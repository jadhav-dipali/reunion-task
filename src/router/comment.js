const express =require("express");
const Router = express.Router();
const {commentPost} = require("../controller/Posts")

Router
  .route('/:id')
  .put(commentPost)



  module.exports=Router