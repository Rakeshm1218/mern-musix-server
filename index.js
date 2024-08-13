const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const env = require('dotenv')
const port = 4000;
const songRoutes = require('./routes/songsRoute')
const userRoutes = require('./routes/userRoutes');
const playlistRoutes = require('./routes/playlistRoutes')

app.use(cors());
app.use(express.json());
env.config();

// Routes
app.use('/songs', songRoutes);
app.use('/users', userRoutes);
app.use('/playlist',playlistRoutes)


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Successfully connected to DB"))
  .catch((err) => console.log(err, "Error connecting to DB")); 

app.listen(port, () => console.log("Server is running on port " + port));
