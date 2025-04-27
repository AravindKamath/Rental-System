const express = require('express');
const router = express.Router();
const db = require('../db');


// Add a new rental
router.post('/', async (req, res) => {
  const { user_id, rentals, return_date, rent_date, total_amount } = req.body;

  try {
    for (const item of rentals) {
      const { item_id, quantity } = item;

      await db.execute(
        `INSERT INTO Rentals (user_id, item_id, quantity, rent_date, return_date, total_amount)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, item_id, quantity, rent_date, return_date, total_amount]
      );
    }

    res.status(201).json({ message: 'Rental recorded successfully' });
  } catch (error) {
    console.error('Error inserting rental:', error);
    res.status(500).json({ error: 'Failed to record rental' });
  }
});

// ✅ Get all rentals for a user
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT Rentals.*, Items.name, Items.image, Items.cost 
       FROM Rentals 
       JOIN Items ON Rentals.item_id = Items.item_id 
       WHERE Rentals.user_id = ?`,
      [user_id]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error fetching rentals:', err);
    res.status(500).json({ message: 'Failed to fetch rentals' });
  }
});

// ✅ Delete a rental by rental_id
router.delete('/:rental_id', async (req, res) => {
  const { rental_id } = req.params;

  try {
    await db.execute('DELETE FROM Rentals WHERE rental_id = ?', [rental_id]);
    res.json({ message: 'Rental removed successfully' });
  } catch (err) {
    console.error('Error deleting rental:', err);
    res.status(500).json({ message: 'Failed to remove rental' });
  }
});

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT Rentals.rental_id, Rentals.item_id, Rentals.quantity, Rentals.rent_date, 
              Rentals.return_date, Rentals.total_amount, Items.name, Items.image
       FROM Rentals
       JOIN Items ON Rentals.item_id = Items.item_id
       WHERE Rentals.user_id = ?`,
      [user_id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
});

module.exports = router;
