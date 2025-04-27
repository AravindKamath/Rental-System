// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a db.js or connection set up

// Handle payment (simulate payment success)
router.post('/', async (req, res) => {
  const { rental_id } = req.body;

  if (!rental_id) {
    return res.status(400).json({ message: 'Rental ID is required for payment.' });
  }

  try {
    // First, fetch the rental to ensure it exists
    const [rental] = await db.query('SELECT * FROM Rentals WHERE rental_id = ?', [rental_id]);

    if (!rental.length) {
      return res.status(404).json({ message: 'Rental not found.' });
    }

    // Optionally: You could also insert into a payment history table here if needed

    // After payment is successful, delete the rental (unrent it)
    await db.query('DELETE FROM Rentals WHERE rental_id = ?', [rental_id]);

    res.json({ message: 'Payment successful and rental removed.' });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'There was an error processing your payment. Please try again.' });
  }
});

module.exports = router;
