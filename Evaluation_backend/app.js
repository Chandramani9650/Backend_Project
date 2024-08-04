const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const courses = require('./model/courses')
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/StudentCourses',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connected to database');
    
}).catch((err)=>{
    console.log('something went wrong......', err);
    
});
app.use(morgan('dev'))
app.use(express.json(),courses);
const port = 8085
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
    
});

