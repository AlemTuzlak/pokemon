

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const authRoutes = require('./routes/authRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

//? Configures environment variables from the .env file
require('dotenv').config();

const app = express();

//? Parses incoming requests
app.use(bodyParser.json()); // application/json
//? Sets the required cors permissions
app.use(cors());

const fileStorage = multer.memoryStorage({
  buffer: async (req, file, cb) => {
    try {
      const image = await Jimp.read(file.buffer);
      if (req.body.main_image === file.originalname) {
        file.buffer = await image.resize(320, 320).quality(80).getBufferAsync();
      } else {
        file.buffer = await image.resize(1080, 540).quality(60).getBufferAsync();
      }

    } catch (err) {
      logger.error(err);
    }
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).fields([ {name: 'image', maxCount: 1}]))


//? Checks the request ApiKey Header before letting the request further
app.use((req, res, next) => {
  if (!req.get('ApiKey') || req.get('ApiKey') !== process.env.API_KEY) {
    const err = new Error('The Api key is incorrect!');
    err.statusCode = 401;
    next(err);
  }
  next();
});

//? Application routes
app.use('/auth', authRoutes);
app.use('/pokemon', pokemonRoutes);
//? Returns a 404 code when trying to hit an endpoint that doesn't exist
app.use(function (req, res, next) {
  var err = new Error('The endpoint you are trying to reach does not exist!');
  err.statusCode = 404;
  next(err);
});
//? Error handling code
app.use((error, req, res, next) => {
  const code = error.code;
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  const data = error.data;
  res.status(status).json({ code: code, message: message, data: data });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
  )
  .then(result => {
    const port = process.env.PORT || 8080;
    const server = app.listen(port);
    
  })
  .catch(err => console.log(err));
