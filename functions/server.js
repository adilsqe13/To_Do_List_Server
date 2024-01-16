require('dotenv').config();
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

// mySQL Database Login
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Addilsqe13@',
  database: 'todolist_db',
});
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

//GET - REQUEST
app.get('/api/allTask', (req, res) => {
  db.query('SELECT * FROM tasklist', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching tasks');
    } else {
      res.status(200).json(results);
    }
  });
});


//POST - REQUEST
app.post('/api/allTask', (req, res) => {
  const { trimmedTask } = req.body;
  db.query('INSERT INTO tasklist VALUES (?)', [trimmedTask], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding student');
    } else {
      res.json(trimmedTask);
    }
  });
});


//DELETE - REQUEST
app.delete('/api/allTask/:task', (req, res) => {
  const task = req.params.task;
  db.query('DELETE FROM taskList WHERE tasks = ?', [task], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting student');
    }
  });
});


//DELETE - REQUEST  (FOR RESET-ALL APP)
app.delete('/reset-data', (req, res) => {
  return db.query('DELETE FROM tasklist', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting student');
    }
  });
});


//SERVER - LISTENING
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
