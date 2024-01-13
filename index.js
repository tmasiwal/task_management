const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const taskRoute=require("./routes/taskRoutes ")

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/users", userRoute);
app.use("/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("welcome");
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
app.listen(process.env.PORT, () => {
  connect();

  console.log("listen");
});

module.exports = app;
