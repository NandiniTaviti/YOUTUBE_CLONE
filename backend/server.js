require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const youtubeRoutes = require("./routes/youtubeRoutes");

const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/youtube", youtubeRoutes);

const songRoutes = require("./routes/songRoutes");
app.use("/api/songs", songRoutes);

app.get("/", (req, res) => {
  res.send("Music Player API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});