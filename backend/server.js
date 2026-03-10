require('dotenv').config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const youtubeRoutes = require("./routes/youtubeRoutes");

dotenv.config();

const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/youtube", youtubeRoutes);

// import routes
const songRoutes = require("./routes/songRoutes");

// use routes
app.use("/api/songs", songRoutes);

app.get("/", (req, res) => {
  res.send("Music Player API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});