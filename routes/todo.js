const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const User = require("../models/user");
const { authenticate } = require("../middlewares/autheticate");
const { body, validationResult } = require('express-validator');

router.post("/", authenticate, [
  body('title').notEmpty().withMessage('Title is required'),
  body('user').isMongoId().withMessage('Invalid user ID'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('filePath').optional().isString().withMessage('File path must be a string')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, completed, user, filePath } = req.body;
  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const todo = new Todo({
      title,
      description,
      completed,
      user,
      filePath
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const todos = await Todo.find().populate("user", "name email");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;