import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';
import OrderItem from './orderitem';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching order data...');
    
    axiosInstance.get('/api/orders')
      .then(response => {
        console.log('Received data:', response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);
  
  return (
    <div>
      <h2>Order History</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        orders.map(order => (
          <div key={order.orderID}>
            <h3>Order ID: {order.orderID}</h3>
            <p>Amount: ${order.amount}</p>
            <ul>
              {order.items.map((item) => (
                <OrderItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Order;
