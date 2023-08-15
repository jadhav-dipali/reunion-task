const express =require("express");
const Router = express.Router();
const {unlikePost} = require("../controller/Posts")

Router
  .route('/:id')
  .put(unlikePost)



  module.exports=Router