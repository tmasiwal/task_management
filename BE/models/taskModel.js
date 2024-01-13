const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const task = mongoose.model("task", taskSchema);

module.exports = task;
