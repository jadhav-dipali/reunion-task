const express =require("express");
const Router = express.Router();
const {PostData , DeleteData , getPostById} = require("../controller/Posts")

Router
  .route('/')
  .post(PostData)

Router
.route("/:id")
.get(getPostById)
.delete(DeleteData)

module.exports = Router;