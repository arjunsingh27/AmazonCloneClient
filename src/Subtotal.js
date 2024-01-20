import React from "react";
import "./Subtotal.css";
// import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Subtotal() {
  const [{ basket }] = useStateValue();

  const history= useHistory();

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

      <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
