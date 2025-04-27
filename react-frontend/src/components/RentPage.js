import React, { useState, useEffect } from 'react';
import '../index.css';

const RentPage = ({ selectedItems }) => {
    const user_id = localStorage.getItem('user_id');
  const [returnDate, setReturnDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotal = () => {
    if (!returnDate) return 0;

    const today = new Date();
    const returnDt = new Date(returnDate);
    const diffDays = Math.max(1, Math.ceil((returnDt - today) / (1000 * 60 * 60 * 24)));

    const total = selectedItems.reduce((acc, item) => {
      return acc + (item.cost * item.quantity * diffDays);
    }, 0);

    return total.toFixed(2);
  };

  const handleConfirmRent = async () => {
    if (!user_id || selectedItems.length === 0 || !returnDate) {
      alert('Please make sure all rental details are filled in.');
      return;
    }
  
    const rentalData = {
      user_id: user_id,
      return_date: returnDate,
      rent_date: new Date().toISOString().slice(0, 10),
      total_amount: totalAmount,
      rentals: selectedItems.map(item => ({  
        item_id: item.item_id,
        quantity: item.quantity
      }))
    };
    
  
    try {
      const res = await fetch('http://localhost:3001/api/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rentalData)
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert('Rental confirmed!');
        // Optionally navigate or clear state
      } else {
        alert(result.message || 'Rental failed');
      }
    } catch (err) {
      console.error('Rental error:', err);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    const total = calculateTotal();
    setTotalAmount(total);
  }, [returnDate, selectedItems]);

  return (
    <div className="rent-page">
      <h2>Rental Summary</h2>
      {selectedItems.length === 0 ? (
        <p>No items selected.</p>
      ) : (
        <>
          <div className="rent-list">
            {selectedItems.map(item => (
              <div key={item.item_id} className="rent-item">
                <img src={item.image} alt={item.name} className="rent-img" />
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ${item.cost}/day</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rent-details">
            <label htmlFor="returnDate">Select Return Date:</label><br />
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
            <h3>Total: ${totalAmount}</h3>
            <button className="rent-btn" onClick={handleConfirmRent}>
            Confirm Rental
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RentPage;
