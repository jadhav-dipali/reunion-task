const express =require("express");
const Router = express.Router();
const {unFollowUser} = require("../controller/resisterLogin")

Router
  .route('/:id')
  .put(unFollowUser)

module.exports = Router;