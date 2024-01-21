import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import Item from "./Item";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import instance from "./axios";
import "./Payment.css";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(null);
  const history = useHistory();

  //

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await instance.post(`/payments/create`, {
          total: calculateSubtotal(),
          basket: basket,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };
    getClientSecret();
    
  }, [basket]);
  

  console.log("THE SECRET IS >>>", clientSecret);
  console.log("👱", user);

  //
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    setProcessing(true);
  
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        history.replace("/order");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const calculateSubtotal = () => {
    const subtotal = basket.reduce((amount, item) => item.price + amount, 0);
    return Math.round(subtotal); // Convert to cents and round to avoid floating-point issues
  };

  return (
    <div className="payment_container">
      <p className="alert">
        This web is in building phase so don't make any mayment
      </p>
      <div className="payment">
        <div className="payment_container">
          <div className="payment_address">
            <h3 className="delevery_address">Delevery Addresss:</h3>
            <p> 101 Independence Avenue, S.E.Washington, D.C. 20559-6000</p>
          </div>
          <div className="review_item">
            <h3>Review Item For Delevery</h3>
            {basket.map((e) => (
              <Item
                id={e.id}
                title={e.title}
                image={e.image}
                price={e.price}
                rating={e.rating}
              />
            ))}
          </div>
          <div className="payment_method">
            <h3>Payment Method</h3>
            <div className="payment_card_container">
              <form onSubmit={handleSubmit}>
                <div className="CardElementContainer">
                  <CardElement
                    className="CardElement"
                    onChange={handleChange}
                  />
                </div>
                <div className="pricecontainer">
                  <p>Pay$ {calculateSubtotal()}</p>
                </div>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p> Processing </p> : "Buy Now"} </span>
                </button>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Payment;
