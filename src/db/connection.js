const mongoose = require('mongoose');
require("dotenv").config();
const URL = process.env.URL; 


mongoose.connect(URL)
.then(()=>console.log("connected Success"))
.catch((err)=>console.log(err.message));