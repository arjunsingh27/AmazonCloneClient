import React from "react";
import Product from "../Product";
import "../Home.css";
import itemdetails from "./itemdetails.js"; 

function Home() {
  const newitemdetails = itemdetails.slice(0,3);
  const secondrow = itemdetails.slice(4,6);
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=2000&t=st=1700202995~exp=1700203595~hmac=0ae9c9b3773ac5e6840d2b49760218aab03cdb122eeffd1c6388e8fb34dd86ab"
          alt="amazon banner"
        />
        <div className="home__row">
          {newitemdetails.map((item) => (
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
          {secondrow.map((item) => (
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
        
      </div>
    </div>
  );
}

export default Home;
