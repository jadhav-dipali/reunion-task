const express =require("express");
const Router = express.Router();
const {PostUser} = require("../controller/resisterLogin")

Router
  .route('/')
  .post(PostUser)

module.exports = Router;