const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all items
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Items');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
