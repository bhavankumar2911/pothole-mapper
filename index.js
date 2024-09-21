const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Pothole = require("./Pothole");
const app = express();

(async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/pothole_mapping");

    console.log("Connected to database...");
  } catch (error) {
    console.log("Cannot connect to database!", error);
  }
})();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/potholes", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "potholes.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

// add pothole
app.post("/", async (req, res) => {
  const { lat, long } = req.body;

  try {
    await Pothole.create({
      lat,
      long,
    });

    return res.json({ message: "Added" });
  } catch (error) {
    return res.json({ message: "Internal server error" });
  }
});

// get all potholes
app.get("/api/potholes", async (req, res) => {
  try {
    const potholes = await Pothole.find();

    return res.json({ potholes });
  } catch (error) {
    return res.json({ message: "Internal server error" });
  }
});

app.get("/api/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Pothole.deleteOne({ _id: id });

    return res.json({ message: "Pothole removed" });
  } catch (error) {
    return res.json({ message: "Internal server error" });
  }
});

app.listen(9000, () => {
  console.log("Server running...");
});
