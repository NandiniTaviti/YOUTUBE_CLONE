const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

router.get("/", async (req,res)=>{
    const songs = await Song.find();
    res.json(songs);
});

router.post("/", async (req,res)=>{
    const song = new Song(req.body);
    await song.save();
    res.json(song);
});

module.exports = router;