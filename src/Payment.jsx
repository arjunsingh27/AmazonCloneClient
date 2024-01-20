import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useStateValue } from "./StateProvider";
import Item from "./Item";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
const PaymentLayout = styled.div`
  margin-left: 50px;

  .payment_address {
    max-height: 20vh;
    display: flex;
    height: 100px;
    ${"" /* background-color:red; */}
  }
  .payment_address > h3,
  p {
    padding: 20px 0px 0px 40px;
  }
  .review_item {
    max-height: 60vh;
    overflow-x: scroll;
  }

  .payment_method {
    max-hight: 20vh;
  }
  .payment_card_container {
    width: 400px;
    height: 200px;
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
  const history= useHistory();
  
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `payments/${calculateSubtotal()}`,
      });
      setClientSecret(response.data.clientSecret)

    }
  }, [basket]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
      card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent})=>{
      setSucceded(true);
      setError(null)
      setProcessing(false)
      history.replaceState('/order')
    })
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
              <h3>Delevery Addresss:</h3>
              <p>{user?.email.slice(0, user?.email.indexOf("@")) || "guest"}</p>

              <p>Lorem ipsum dolor sit amet, ab corporis modi imp </p>
            </div>
            <h1>Review Item For Delevery</h1>
            <div className="review_item">
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
              <h1>Payment Method</h1>
              <div className="payment_card_container">
                <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange} />
                  <div className="pricecontainer">
                    Pay${calculateSubtotal()}
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
