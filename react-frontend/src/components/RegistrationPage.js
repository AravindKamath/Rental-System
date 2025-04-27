import React, { useState } from 'react';
import '../index.css'; // Make sure this import is present

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        setMessage(result.message || 'Registration failed');
        setSuccess(false);
      }
    } catch (err) {
      setMessage('Server error. Please try again later.');
      setSuccess(false);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />

          <button type="submit">Register</button>

          {message && (
            <p className={`message ${success ? 'success' : 'error'}`}>{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
