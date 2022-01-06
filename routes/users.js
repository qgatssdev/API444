const express = require('express');
const router = express.Router();
const User = require('../models/user');

//Getting all
router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

//creating one
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Updating one
router.put('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = res.body.name;
    res.user.age = res.body.name;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting one
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted User' });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot Find User' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
