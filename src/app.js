const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
require("./db/connection");
const UserRouter = require("./router/userRouter");
const userLogin = require("./router/LoginUser");
const followRouter = require("./router/followRouter");
const unFollowRouter = require("./router/unFollowRouter");
const user = require("./router/getUser");
const PostRoter = require("./router/PostsRouter");
const getAllPost = require("./router/getAllPost");
const likePost = require("./router/likePost");
const unlikePost = require("./router/unlikePost");
const comment = require("./router/comment")
app.use(express.json());

app.use("/register" , UserRouter);
app.use("/authenticate" , userLogin);
app.use("/follow" ,followRouter );
app.use("/unfollow" ,unFollowRouter);
app.use("/user" ,user);
app.use("/posts" , PostRoter);
app.use("/all_posts" , getAllPost);
app.use("/like" , likePost);
app.use("/unlike" , unlikePost);
app.use("/comment" , comment);




app.listen(PORT , ()=>{
    console.log(`listening port ${PORT}`);
})