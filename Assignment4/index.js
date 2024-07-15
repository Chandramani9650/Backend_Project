const http = require('http')
const express = require('express')
const fs = require('fs')
const path = require('path')
const { log } = require('console')
const server = express()
server.use(express.json());
const readData = () => {
    try {
      const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
    //   console.log(data, "you data ")
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading data:', err);
      return null;
    }
  };
  readData()
const writeData = ()=>{
    try {
        const data = fs.writeFileSync(path.join(__dirname,'db.json'),JSON.stringify(data,null,3))

    } catch (error) {
        console.error('Error reading data:', error); 
    }
}

server.get('/home', (req, res)=>{
    let data = readData()
  if (req.url=='/home' && data) {
  
   res.status(200).json(data.todos);
   console.log(data);
  }else{
    res.status(500).send('Error reading data');
  }
  res.end()
})
server.post('/add', (req, res)=>{
   let data = readData()
if (!data) {
    res.status(500).send('Error reading data');
}
    
const newTodo = req.body;
data.push(newTodo);
fs.writeFileSync('./db.json', JSON.stringify(data))
res.status(201).send('Todo added successfully');



  

    

})

server.put('/update', (req, res)=>{
let data = readData()
let upDatedData = data.todos.map((item)=>{
    if (item.id==req.body.id) {
        return({
            ...item,title:req.body.title
        })

    }else{
        return item
    }


})
fs.writeFileSync('./db.json', JSON.stringify(upDatedData))
res.send('data updated')
    
})

server.delete('/delete', (req, res)=>{
    let data = readData()
    if (data) {
        let newData = data.filter((item)=>item.id!==req.body.id)
        fs.writeFileSync('./db.json', JSON.stringify(newData))
        console.log(newData);
    }else{
        res.send("something is wrong")
    }
    res.end()


})

server.listen(8085, ()=>{
    console.log("Server is running......");
})