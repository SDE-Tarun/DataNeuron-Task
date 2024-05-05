var express = require("express"); // Importing Express framework
var router = express.Router(); // Creating a new router instance

const UsersSchema = require("../models/users.model"); // Importing UsersSchema from models

router.get("/users", async function (req, res, next) { // Handling GET request for fetching users
  try {
    const users = await UsersSchema.find({}); // Finding all users from the database
    return res.json({ users }); // Sending JSON response with users data
  } catch (error) {
    console.log("Error", error); // Logging any errors that occur
  }
});

router.post("/save", async function (req, res, next) { // Handling POST request for saving a new user
  try {
    const payload = req.body; // Extracting user data from request body
    const newUser = new UsersSchema(payload); // Creating a new user instance
    await newUser.save(); // Saving the new user to the database
    return res.json({ message: "User successfully created" }); // Sending success message
  } catch (error) {
    console.log("Error", error); // Logging any errors that occur
  }
});

router.put("/update", async function (req, res, next) { // Handling PUT request for updating user data
  try {
    const { _id, ...payload } = req.body; // Extracting user ID and updated data from request body
    await UsersSchema.findByIdAndUpdate(_id, payload); // Updating user data in the database
    return res.json(payload); // Sending updated user data as response
  } catch (error) {
    console.log("Error", error); // Logging any errors that occur
  }
});

router.get("/updateCount", async (req, res) => { // Handling GET request for fetching update count
  try {
    // Aggregating the sum of updateApiCalled values from all documents in the collection
    const result = await UsersSchema.aggregate([
      {
        $group: {
          _id: null,
          totalUpdateApiCalled: { $sum: "$updateApiCalled" },
        },
      },
    ]);

    // Sending the sum as JSON response
    res.json({ sum: result[0].totalUpdateApiCalled });
  } catch (error) {
    // Handling any errors that occur
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router; // Exporting the router for use in other files
