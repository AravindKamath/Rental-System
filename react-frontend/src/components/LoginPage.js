import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem('user_id', result.user_id);
        navigate('/home');
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          <button type="submit">Login</button>

          {message && <p className="message error">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
