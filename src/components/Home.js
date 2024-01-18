import React from "react";
import Product from "../Product";
import "../Home.css";
import itemdetails from "./itemdetails.js"; // Adjust the path relative to Home.js file

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=2000&t=st=1700202995~exp=1700203595~hmac=0ae9c9b3773ac5e6840d2b49760218aab03cdb122eeffd1c6388e8fb34dd86ab"
          alt="amazon banner"
        />
        <div className="home__row">
          <Product
            title="Fastrack"
            price={11.96}
            rating={5}
            image="https://m.media-amazon.com/images/I/51EiXZQZcJL._AC_UL640_FMwebp_QL65_.jpg"
          />
          <Product
            title="Fastrack"
            price={11.96}
            rating={5}
            image="https://m.media-amazon.com/images/I/61FFBTzKiUL._AC_UL640_FMwebp_QL65_.jpg"
          />
        </div>
        <div className="home__row">
          {itemdetails.map((item) => (
            <Product
              key={item.id} // Unique key for each Product
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>
        <div className="home__row">
          <Product
            title=" Fastrack"
            price={11.96}
            rating={5}
            image="https://m.media-amazon.com/images/I/51THPLzdxzL._AC_UL640_FMwebp_QL65_.jpg"
          />
          <Product
            title="Fastrack"
            price={20}
            rating={5}
            image="https://m.media-amazon.com/images/I/61T+tL7zfvL._AC_UL640_FMwebp_QL65_.jpg"
          />
          <Product
            title=" Fastrack"
            price={11.96}
            rating={5}
            image="https://m.media-amazon.com/images/I/51CJr2XU1HL._AC_UL640_FMwebp_QL65_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
