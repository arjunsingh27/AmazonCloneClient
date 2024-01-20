import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useStateValue } from "./StateProvider";
import Item from "./Item";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import "./Payment.css";
const PaymentLayout = styled.div`
  margin-left: 50px;

  .payment_address {
    max-height: 20vh;
    display: flex;
    height: 100px;
    
  }
 
  .review_item {
    max-height: 60vh;
    overflow-y: scroll;
  }

 
  
  .pricecontainer > p {
    margin-top:10px;
    font-size: 1rem;
    font-weight: 400;
  }
   button {
    left: 1px;
    background-color: #f0c14b;
    border: 1px solid #a88734;
    padding: 8px 15px;
    color: #111;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    margin-top:10px;
  }
  
  button:hover {
    background-color: #ddb347;
  }
  
  
`;

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `payments/${calculateSubtotal()}`,
      });
      setClientSecret(response.data.clientSecret);
    };
  }, [basket]);

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
        setSucceded(true);
        setError(null);
        setProcessing(false);
        history.replaceState("/order");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const calculateSubtotal = () => {
    const subtotal = basket.reduce((amount, item) => item.price + amount, 0);
    return subtotal;
  };

  return (
    <>
      <PaymentLayout>
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
      </PaymentLayout>
    </>
  );
};

export default Payment;
