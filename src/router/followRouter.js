const express =require("express");
const Router = express.Router();
const {followUser} = require("../controller/resisterLogin")

Router
  .route('/:id')
  .put(followUser)

module.exports = Router;