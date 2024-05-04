var express = require('express');
var router = express.Router();
const UsersSchema = require('../models/users.model');

router.get('/users', async function(req, res, next) {
  try {
  const users = await UsersSchema.find({});
  return res.json({users});
  } catch (error) {
    console.log('Error', error);
  }
});

router.post('/save', async function(req, res, next) {
  try {
  const payload = req.body;
  const newUser = new UsersSchema(payload);
  await newUser.save();
  return res.json({message:"User successfully created"});
  } catch (error) {
    console.log('Error', error);
  }
});

router.put('/update', async function(req, res, next) {
  try {
    const {_id, ...payload} = req.body;
    console.log(_id);
    console.log(payload);
    await UsersSchema.findByIdAndUpdate(_id, payload);
    return res.json(payload);
  } catch (error) {
    console.log('Error', error);
  }
});

router.get('/updateCount', async (req, res) => {
  try {
      // Find all documents in the collection and calculate the sum of updateApiCalled values
      const result = await UsersSchema.aggregate([
          {
              $group: {
                  _id: null,
                  totalUpdateApiCalled: { $sum: "$updateApiCalled" }
              }
          }
      ]);

      // Return the sum as JSON response
      res.json({ sum: result[0].totalUpdateApiCalled });
  } catch (error) {
      // Handle any errors
      console.error("Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
