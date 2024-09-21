const mongoose = require("mongoose");
const { Schema } = mongoose;

const potholeSchema = new Schema({
  lat: String,
  long: String,
});

module.exports = mongoose.model("Pothole", potholeSchema);
