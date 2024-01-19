import React from "react";
import "./Subtotal.css";
// import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";

function Subtotal() {
  const [{ basket }] = useStateValue();

  const calculateSubtotal = () => {
    const subtotal = basket.reduce((amount, item) => item.price + amount, 0);
    return subtotal;
  };

  return (
    <div className="Subtotal">
      <p>
        Subtotal ({basket?.length} items):{" "}
        <strong>{calculateSubtotal()}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>

      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
