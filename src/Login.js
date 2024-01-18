import React from "react";
import "./Login.css";
import { Link ,useHistory} from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase";
 

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {

    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then((auth) => {
        history.push('/')
    })
    .catch(error => alert("User Not Found"))
    
  };

  const register = (e) => {
    e.preventDefault();
  auth.createUserWithEmailAndPassword(email, password)
  .then((auth) => {
    //Success fully Created the User
    console.log(auth);
  })
  .catch(error => alert(error.message))
   
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2048px-Amazon_icon.svg.png"
          alt="amazon logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={signIn}
            className="login__signInButton"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
