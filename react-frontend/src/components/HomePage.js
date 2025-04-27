import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const HomePage = ({ setSelectedItems }) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(err => console.error('Failed to fetch items:', err));
  }, []);

  const handleRentClick = (item) => {
    const image = itemImages[item.name];
    setSelectedItems(prevItems => {
      const itemExists = prevItems.some(existingItem => existingItem.item_id === item.item_id);

      if (!itemExists) {
        // return [...prevItems, { ...item, quantity: 1 }];
        return [...prevItems, { ...item, quantity: 1, image }];
      } else {
        return prevItems;
      }
    });
    navigate('/rent'); 
  };

  const handleViewRents = () => {
    navigate('/view-rent');
  };

  const itemImages = {
    'DJI Drone Mini': '/images/drone.jpg',
    'Canon DSLR Camera': '/images/camera.jpg',
    'Electric Drill': '/images/camera2.jpg',
    'GoPro Hero 9': '/images/gopro.jpg',
    'Camping Tent': '/images/mic.jpg',
    'Mountain Bike': '/images/gimbal.jpeg',
    'DJI Osmo Mobile 3': '/images/gimbal2.jpg',
  };

  return (
    <div className="home-container">
      {/* Top button to view rented items */}
      <div className="top-section">
        <h1>Equipment Rental System</h1>

        <button className="view-rent-btn" onClick={handleViewRents}>
          View My Rented Items
        </button>
      </div>


      <h2>Available Items for Rent</h2>

      <div className="card-grid">
        {items.slice(0, visibleCount).map(item => (
          <div key={item.item_id} className="card">
            <img
              src={itemImages[item.name] || 'https://via.placeholder.com/150'}
              alt={item.name}
              className="card-img"
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="price">${item.cost}/day</p>
            <p>Available: {item.quantity}</p>
            <button className="rent-btn" onClick={() => handleRentClick(item)}>
              Rent Now
            </button>
          </div>
        ))}
      </div>
      {visibleCount < items.length && (
      <div className="load-more-container">
      <button className="load-more-btn" onClick={() => setVisibleCount(items.length)}>
      Load More
      </button>
      </div>
      )}
    </div>
  );
};

export default HomePage;

