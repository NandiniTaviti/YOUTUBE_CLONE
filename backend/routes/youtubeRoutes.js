const express = require("express");
const router = express.Router();
const axios = require("axios");

// Make sure your .env has: YOUTUBE_API_KEY=YOUR_KEY_HERE
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q || "top songs"; // fallback if empty

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query + " official song",
          type: "video",
          videoCategoryId: "10",
          maxResults: 10,
          key: YOUTUBE_API_KEY
        }
      }
    );

    res.json(response.data.items);
  } catch (error) {
    console.error("YouTube API error:", error.response?.data || error.message);

    // return empty array instead of breaking frontend
    res.status(500).json([]);
  }
});

module.exports = router;