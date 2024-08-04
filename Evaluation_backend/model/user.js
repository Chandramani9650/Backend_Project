const mongoose = require('mongoose')
const user_Schema = new mongoose.Schema({
    user_name:{type:String, required:true, unique:true},
    password:{type:String,required:true, unique:true},

})
module.exports = mongoose.model('User', user_Schema);