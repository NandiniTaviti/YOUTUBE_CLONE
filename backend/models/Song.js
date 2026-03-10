const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  songUrl: String,
  coverImage: String
});

module.exports = mongoose.model("Song", songSchema);