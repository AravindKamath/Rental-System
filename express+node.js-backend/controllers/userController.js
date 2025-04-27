// controllers/userController.js
const db = require('../db'); // Adjust path if needed

// Register User
const registerUser = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await db.execute(
      'INSERT INTO Users (name, email, phone) VALUES (?, ?, ?)',
      [name, email, phone]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ message: 'Email already registered' });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, phone } = req.body;

  if (!email || !phone) {
    return res.status(400).json({ message: 'Email and phone are required' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM Users WHERE email = ? AND phone = ?',
      [email, phone]
    );

    if (rows.length > 0) {
      const user = rows[0];

      // ✅ Return user info including user_id
      res.status(200).json({
        message: 'Login successful',
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createRental = async (req, res) => {
  const { user_id, return_date, total_amount, items } = req.body;

  if (!user_id || !return_date || !total_amount || !items || items.length === 0) {
    return res.status(400).json({ message: 'Missing rental details' });
  }

  const connection = await db.getConnection(); // assuming you're using a MySQL pool

  try {
    await connection.beginTransaction();

    // Insert into Rentals table
    const [rentalResult] = await connection.execute(
      'INSERT INTO Rentals (user_id, return_date, total_amount) VALUES (?, ?, ?)',
      [user_id, return_date, total_amount]
    );

    const rental_id = rentalResult.insertId;

    // (Optional) Insert each item into RentalItems table (if using one)
    // for (const item of items) {
    //   await connection.execute(
    //     'INSERT INTO RentalItems (rental_id, item_id, quantity) VALUES (?, ?, ?)',
    //     [rental_id, item.item_id, item.quantity]
    //   );
    // }

    await connection.commit();
    res.status(201).json({ message: 'Rental created successfully', rental_id });

  } catch (err) {
    await connection.rollback();
    console.error('Rental error:', err);
    res.status(500).json({ message: 'Failed to create rental' });
  } finally {
    connection.release();
  }
};

// Export both functions
module.exports = {
  registerUser,
  loginUser,
  createRental
};
