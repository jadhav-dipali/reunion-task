const express =require("express");
const Router = express.Router();
const {loginUser} = require("../controller/resisterLogin")

Router
  .route('/')
  .post(loginUser)

module.exports = Router;