const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ _id: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});
