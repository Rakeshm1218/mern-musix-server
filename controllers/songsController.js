const Songs = require("../models/songsModel");
const { v4: uuidv4 } = require("uuid");

exports.addSong = async (req, res) => {
  const { songName, artist, duration, songURL, imageURL, genre, language } =
    req.body;
  try {
    const newSong = new Songs({
      song_id: uuidv4(),
      songName,
      artist,
      duration,
      songURL,
      imageURL,
      genre,
      language,
    });
    await newSong.save();
    res.status(201).json({ message: "Song created successfully", newSong });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Songs.find();
    res.send( songs );
  } catch (error) {
    res.status(404).json({ message: "Cannot get songs" });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const query = { _id: new Object(id) };
    // console.log(query);
    await Songs.deleteOne({query: query});
    res.status(200).json({
      message: "Song deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: "Error deleting song", error });
  }
};
