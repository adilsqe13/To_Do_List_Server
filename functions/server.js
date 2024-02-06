require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
const Tasks = require('./models/Task');
const Users = require('./models/User');
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

//POST - for info-weather
app.post('/.netlify/functions/server/api/add-user', async(req, res) => {
  const { username, email, city } = req.body;
  const user = new Users({
      username: username,
      email: email,
      city: city
    })
  await user.save();
  res.json({success:true});
});

app.get('/.netlify/functions/server/api/get-users', async(req, res) => {
  const users = await Users.find();
  res.json({success:true, users:users});
});

app.put('/.netlify/functions/server/api/update-active', async(req, res) => {
  const email = req.body.email;
  const isChecked = req.body.isChecked;
  await Users.updateOne({ email: email }, { $set: { active: isChecked } });
  res.status(200).json();
});


// SERVER - LISTENING
app.listen(port, () => {
  console.log(`Server is running on port ${port}`) ;
});

module.exports.handler = serverless(app);