const mongoose = require('mongoose');

mongoose
  .connect("mongodb://localhost:27017/Task-2")
  .then(() => {
    console.log("Task-2 Database is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });


