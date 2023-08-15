const express =require("express");
const Router = express.Router();
const {likePost} = require("../controller/Posts")

Router
  .route('/:id')
  .put(likePost)



  module.exports=Router