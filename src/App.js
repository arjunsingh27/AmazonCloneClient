import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./Checkout";
import Login from "./Login";
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Order from "./order";

const promise = loadStripe("pk_test_51Oac52SElcdkcjvWeNAwbczbaOp8a9P0Z5Q1a2fNNBIMe4rJmv5faEnUxTSQ5jnFIcnp7g4XkJKTrMNtZu3NBizB00S56gtLsd");


function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("User is >>>,", authUser);
      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      }else{
      dispatch({
        type: "SET_USER",
        user:authUser
      })
      }
    }
    );
  }, []);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/order">
          <Header />
            <Order />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
            <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router> 
  );
}

export default App;
