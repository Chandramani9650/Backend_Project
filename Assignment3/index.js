const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const PORT = 3000;

server.use(express.json());

// Utility function to read JSON data from file
const readData = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data:', err);
    return null;
  }
};

// Utility function to write JSON data to file
const writeData = (data) => {
  try {
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing data:', err);
  }
};

// API to get all the todos present in the database
server.get('/todos', (req, res) => {
  const data = readData();
  if (data) {
    res.status(200).json(data.todos);
    console.log(data);
  } else {
    res.status(500).send('Error reading data');
  }
});

// API to add a new todo in the database
server.post('/todos', (req, res) => {
  const data = readData();
  if (!data) {
    return res.status(500).send('Error reading data');
  }

  const newTodo = req.body;
  data.todos.push(newTodo);
  writeData(data);
  res.status(201).send('Todo added successfully');
});

// API to update the status of all the todos that have even ID from false to true
server.put('/todos/update', (req, res) => {
  const data = readData();
  if (!data) {
    return res.status(500).send('Error reading data');
  }

  data.todos = data.todos.map(todo => {
    if (todo.id % 2 === 0 && todo.status === false) {
      todo.status = true;
    }
    return todo;
  });

  writeData(data);
  res.status(200).send('Todos with even IDs updated successfully');
});

// API to delete all the todos whose status is true
server.delete('/todos/delete', (req, res) => {
  const data = readData();
  if (!data) {
    return res.status(500).send('Error reading data');
  }

  data.todos = data.todos.filter(todo => !todo.status);
  writeData(data);
  res.status(200).send('Todos with status true deleted successfully');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
