import React from "react";
import Product from "../Product";
import "../Home.css";
import itemdetails from "./itemdetails.js"; 
import { useEffect, useState } from "react";
import axiosInstance from "../axios";

function LoadingSpinner() {
  return (
    <div className="loading_container">
    <div className="loading-spinner">
    </div>
    </div>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [RowOne, setRowOne] = useState([]);
  const [RowTwo, setRowTwo] = useState([]);

  useEffect(() => {
    console.log('Fetching order data...');
    
    axiosInstance.get('/api/products')
      .then(response => {
        console.log('Received data:', response.data);
        setLoading(false);

        // Set rows based on the received data
        setRowOne(response.data.slice(0, 3));
        setRowTwo(response.data.slice(3, 6));
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=2000&t=st=1700202995~exp=1700203595~hmac=0ae9c9b3773ac5e6840d2b49760218aab03cdb122eeffd1c6388e8fb34dd86ab"
          alt="amazon banner"
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="home__row">
              {RowOne.map((item) => (
                <Product
                  key={item.id}  
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                />
              ))}
            </div>
            <div className="home__row">
              {RowTwo.map((item) => (
                <Product
                  key={item.id}  
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
