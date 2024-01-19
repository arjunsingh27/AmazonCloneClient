import React from "react";
import "./Item.css";
const { useStateValue } = require("./StateProvider");

function Item({ id ,title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const removefromBasket = () => {
     
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id:id, 
    });
  };

  return (
    <div className="item">
      <div className="item__info">
        <p>{title}</p>
        <p className="item__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="item__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="item" />
      <button onClick={removefromBasket}>Remove From Basket</button>
    </div>
  );
}

export default Item;
