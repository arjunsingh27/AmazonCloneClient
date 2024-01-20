import React from "react";
import styled from "@emotion/styled";
import { useStateValue } from "./StateProvider";
import Item from "./Item";

const PaymentLayout = styled.div`
max-height:100vh;
 
   .payment_address{
    max-height:20vh;
    display:flex;
    height:100px;
    ${'' /* background-color:red; */}
   } 
   .payment_address > h3 , p{
     padding:20px 0px 0px 40px;
     
   }
   .review_item {
    max-height: 60vh;
    overflow-x: scroll;
}

   
   .payment_method{
    max-hight:20vh;

   }
`;

const Payment = () => {
  const [{basket,user},dispatch]  = useStateValue();

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
          
              {basket.map(e =>(
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
          <div className="payment_container">
            
          </div>
          </div>
          </div>
        </div>
      </PaymentLayout>
    </>
  );
};

export default Payment;
