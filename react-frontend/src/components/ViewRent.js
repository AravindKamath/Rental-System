// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ViewRent = () => {
//   const user_id = localStorage.getItem('user_id');
//   const [rentals, setRentals] = useState([]);
//   const navigate = useNavigate();

//   const fetchRentals = async () => {
//     try {
//       const res = await fetch(`http://localhost:3001/api/rentals/${user_id}`);
//       const data = await res.json();
//       setRentals(data);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   // const handleUnrent = async (rental_id) => {
//   //   try {
//   //     const res = await fetch(`http://localhost:3001/api/rentals/${rental_id}`, {
//   //       method: 'DELETE'
//   //     });

//   //     const result = await res.json();

//   //     if (res.ok) {
//   //       alert(result.message);
//   //       fetchRentals(); // Refresh list
//   //     } else {
//   //       alert('Failed to remove rental');
//   //     }
//   //   } catch (err) {
//   //     console.error('Unrent error:', err);
//   //   }
//   // };

//   const handleUnrent = (rental) => {
//     const queryParams = new URLSearchParams({
//       rental_id: rental.rental_id,
//       name: rental.name,
//       total_amount: rental.total_amount
//     }).toString();
  
//     navigate(`/payment?${queryParams}`);
//   };

//   const handleBack = () => {
//     navigate('/home'); // assuming "/" is your HomePage route
//   };

//   useEffect(() => {
//     fetchRentals();
//   }, []);

//   return (
//     <div className="home-container">
//       <h2>Your Rented Items</h2>
//       {rentals.length === 0 ? (
//         <p>No items rented.</p>
//       ) : (
//         <div className="card-grid">
//           {rentals.map(rental => (
//             <div key={rental.rental_id} className="card">
//               <img
//                 src={rental.image || 'https://via.placeholder.com/150'}
//                 alt={rental.name}
//                 className="card-img"
//               />
//               <h3>{rental.name}</h3>
//               <p>Qty: {rental.quantity}</p>
//               <p>Rented until: {rental.return_date}</p>
//               <p>Total: ${rental.total_amount}</p>
//               <button className="rent-btn" onClick={() => handleUnrent(rental)}>Unrent</button>
//             </div>
//           ))}
//         </div>
//       )}
//       <div style={{ textAlign: 'center', marginTop: '30px' }}>
//         <button className="back-btn" onClick={handleBack}>Back to Home</button>
//       </div>
//     </div>
//   );
// };

// export default ViewRent;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewRent = () => {
  const user_id = localStorage.getItem('user_id');
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  const fetchRentals = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/rentals/${user_id}`);
      const data = await res.json();
      setRentals(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleUnrent = (rental) => {
    const queryParams = new URLSearchParams({
      rental_id: rental.rental_id,
      name: rental.name,
      total_amount: rental.total_amount
    }).toString();
  
    navigate(`/payment?${queryParams}`);
  };

  const handleBack = () => {
    navigate('/home'); // Corrected: Navigating to '/home'
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  return (
    <div className="home-container">
      <h2>Your Rented Items</h2>

      {rentals.length === 0 ? (
        <p>No items rented.</p>
      ) : (
        <div className="card-grid">
          {rentals.map(rental => (
            <div key={rental.rental_id} className="card">
              <img
                src={rental.image || 'https://via.placeholder.com/150'}
                alt={rental.name}
                className="card-img"
              />
              <h3>{rental.name}</h3>
              <p>Qty: {rental.quantity}</p>
              <p>Rented until: {rental.return_date}</p>
              <p>Total: ${rental.total_amount}</p>
              <button className="rent-btn" onClick={() => handleUnrent(rental)}>Unrent</button>
            </div>
          ))}
        </div>
      )}

      {/* Back Button (Always Visible) */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button className="back-btn" onClick={handleBack}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ViewRent;
