const express =require("express");
const Router = express.Router();
const {getUser} = require("../controller/resisterLogin")

Router
  .route('/')
  .get(getUser)

module.exports = Router;