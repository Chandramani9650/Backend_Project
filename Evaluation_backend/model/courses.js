const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    id:{type:String, required:true, unique:true},
    title:{type:String, required:true},
    category:{type:String, required:true},
    dificulty:{type:String, required:true},
    description:{type:String, required:true}
})

module.exports = mongoose.model('Courses', courseSchema)