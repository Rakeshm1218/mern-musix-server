const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    user_id : String,
    playlistName : String,
    songs : [
        {
            song_id : {
                type:String,
                unique: [true,"Song already exists"]
            },

        }
    ]
})

const Playlists = mongoose.model('Playlists', playlistSchema);
module.exports = Playlists;