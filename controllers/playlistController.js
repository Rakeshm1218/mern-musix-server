const Playlists = require("../models/playlistModel");
const Songs = require("../models/songsModel");

exports.addSongtoPlaylist = async (req, res) => {
  const { user_id } = req.user;
  const { song_id, playlistName } = req.body;
  let playlist = await Playlists.findOne({ user_id });

  try {
    if (!playlist) {
      playlist = new Playlists({ user_id, playlistName, songs: [{ song_id }] });
      await playlist.save();
      return res
        .status(200)
        .json({ message: "Playlist created successfully", playlist });
    }

    const songExists = playlist.songs.some((song) => song.song_id === song_id);

    if (songExists) {
      return res
        .status(200)
        .json({ message: "Song already in playlist", playlist });
    }

    playlist.songs.push({ song_id });
    await playlist.save();

    return res.status(200).json({ message: "Playlist updated", playlist });
  } catch (error) {
    return res.status(500).json({ message: "Error updating playlist", error });
  }
};

exports.getPLaylistItems = async (req, res) => {
  const { user_id } = req.user;
  try {
    const playlist = await Playlists.findOne({ user_id });
    console.log(playlist);

    if (!playlist) {
      return res.status(404).json({ message: "playlist not found" });
    }
    const playlistItems = await Promise.all(
      playlist.songs.map(async (song) => {
        const songDetail = await Songs.find({ song_id: song.song_id });
        console.log(songDetail)
        return {
          song_id: song.song_id,
          songName: songDetail.songName,
          artist: songDetail.artist,
          imageURL: songDetail.imageURL,
          songURL:songDetail.songURL
        };
      })
    );

    res.status(200).json({ message: "Playlist items fetched successfully", playlistItems });
  } catch(error) {
    res
      .status(500)
      .json({
        message: "An error occured while fetching playlist items",
        error,
      });
  }
};
