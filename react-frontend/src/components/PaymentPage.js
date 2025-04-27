// src/components/PaymentPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../index.css";

const PaymentPage = () => {
  const user_id = localStorage.getItem('user_id');
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const rental_id = queryParams.get('rental_id');
  const name = queryParams.get('name');
  const total_amount = queryParams.get('total_amount');

  if (!rental_id || !name || !total_amount) {
    return <p>No payment data available.</p>;
  }

  const handlePayment = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rental_id: rental_id }),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Payment successful!');
        navigate('/view-rent');
      } else {
        alert(result.message || 'Payment failed.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('There was an error processing your payment. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Summary</h2>
      <div className="payment-card">
        <h3>{name}</h3>
        <p>Total Amount: ${total_amount}</p>
        <button className="pay-btn" onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default PaymentPage;
