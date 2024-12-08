import React, { useState, useEffect } from 'react';
import './Orders.css'; // Import the stylesheet
import Navbar from './Navbar'; // Import the Navbar component

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user orders from the server
    fetch('http://localhost:4999/orders', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <Navbar /> {/* Add the Navbar component */}
      <div className="orders-container">
        <h1>Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                <p>Order ID: {order.id}</p>
                <p>Item: {order.item_name}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
