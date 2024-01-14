const express = require("express");
const task = require("../models/taskModel");
const authMiddle = require("../middleware/authMiddleware");
const taskRoute = express.Router();

taskRoute.get("/", authMiddle, async (req, res) => {
  const userId = req.body.userId;
  const Task = await task.find({ userId });
  if (Task.length > 0) {
    res.send({ Task });
  } else {
    res.send({ msg: "no task found" });
  }
});

taskRoute.post("/add", authMiddle, async (req, res) => {
  try {
    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;

    // Create a new task
    const newTask = new task({
      userId: userId,
      title: title,
      description: description,
    });

    // Save the task to the database
    const savedTask = await newTask.save();
const Task = await task.find({ userId });
    res.status(200).json(Task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

taskRoute.delete("/:id", authMiddle, async (req, res) => {
  try {
    const taskId = req.params.id;

    // Check if the task exists
    const existingTask = await task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Check if the task belongs to the authenticated user
    if (existingTask.userId !== req.body.userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Delete the task
    const deletedTask = await task.findByIdAndDelete(taskId);
const Task = await task.find({ useId: req.body.userId });
    res.status(200).json(Task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

taskRoute.patch("/:id", authMiddle, async (req, res) => {
  try {
    const taskId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    // Check if the task exists
    const existingTask = await task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Check if the task belongs to the authenticated user
    if (existingTask.userId !== req.body.userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Update the task
    const updateTask = await task.findByIdAndUpdate(taskId, {
      title,
      description,
    });

   const Task = await task.find({useId:req.body.userId});
   res.status(200).json(Task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = taskRoute;
