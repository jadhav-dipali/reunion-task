const mongoose = require("mongoose");

const regiSchema= mongoose.Schema({
    name:{
           type:String,
           require:true
       },
       email:{
           type:String,
           require:true,
           unique:true,
       },
       password:{
           type:String,
           require:true,
       },
       follow:{
        type:[String]
       }
});

const Register = new mongoose.model("Rgister" ,regiSchema);
module.exports = Register;