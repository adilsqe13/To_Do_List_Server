require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
const Tasks = require('./models/Task');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

// Database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

//GET - REQUEST
app.get('/.netlify/functions/server/api/allTask', async(req, res) => {
   const tasks = await Tasks.find({});
   res.status(200).json(tasks);
});


//POST - REQUEST
app.post('/.netlify/functions/server/api/allTask', async(req, res) => {
  const { trimmedTask } = req.body;
  const task = new Tasks({
      task: trimmedTask
    })
  await task.save();
  res.json({success:true});
});


//DELETE - REQUEST
app.delete('/.netlify/functions/server/api/allTask/:taskId', async(req, res) => {
  const taskId = req.params.taskId;
  await Tasks.deleteOne({_id: taskId});
  res.json({success:true});
});


//DELETE - REQUEST  (FOR RESET-ALL APP)
app.delete('/.netlify/functions/server/reset-data', async(req, res) => {
  await Tasks.deleteMany({});
  res.json({success:true});
});


//SERVER - LISTENING
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports.handler = serverless(app);