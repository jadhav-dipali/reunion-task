const express =require("express");
const Router = express.Router();
const {getAllPost} = require("../controller/Posts")

Router
  .route('/')
  .get(getAllPost)



  module.exports=Router