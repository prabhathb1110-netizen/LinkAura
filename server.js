require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

// Error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const first = Object.values(err.errors)[0].message;
    return res.status(400).json({ error: first });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid task id' });
  }
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
