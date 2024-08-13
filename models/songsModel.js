const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({
    song_id: String,
    songName: String,
    artist: String,
    duration: String,
    songURL: String,
    imageURL: String,
    genre: String,
    language: String
})


const Songs = mongoose.model('Songs',songsSchema);
module.exports = Songs