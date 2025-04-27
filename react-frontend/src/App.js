import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RentPage from './components/RentPage';
import ViewRent from './components/ViewRent';
import PaymentPage from './components/PaymentPage';

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage setSelectedItems={setSelectedItems} />} />
        <Route path="/rent" element={<RentPage selectedItems={selectedItems} />} />
        <Route path="/view-rent" element={<ViewRent />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
