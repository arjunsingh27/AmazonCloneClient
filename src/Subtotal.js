import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";

function Subtotal() {
  const [{ basket }] = useStateValue();

  const calculateSubtotal = () => {
    const subtotal = basket.reduce((amount, item) => item.price + amount, 0);
    return subtotal;
  };

  return (
     
    <div className="Subtotal">
     <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
             
              Subtotal ({basket?.length} items):{" "}
              <strong>{calculateSubtotal()}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={calculateSubtotal()}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button>Proceed to Checkout</button> 
    </div>
  );
}

export default Subtotal;
