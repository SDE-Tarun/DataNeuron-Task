const mongoose = require("mongoose"); // Importing mongoose library

mongoose // Connecting to MongoDB database
  .connect("mongodb://localhost:27017/Task-2") // MongoDB connection URL
  .then(() => { // Handling successful connection
    console.log("Task-2 Database is connected successfully"); // Logging success message
  })
  .catch((err) => { // Handling connection error
    console.log(err); // Logging the error if connection fails
  });

