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
    <div className="item_left">
    <img src={image} alt="item" />
    </div>
    <div className="item_right">
      <div className="item__info">
        <p>{title}</p>
        <p className="item__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="item__rating"> Review &nbsp;&nbsp;
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <div className="item_button">
      <button onClick={removefromBasket}>Remove From Basket</button>
      </div>
      </div>
    </div>
   
  );
}

export default Item;
