const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title must be 100 characters or less']
    },
    done: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
