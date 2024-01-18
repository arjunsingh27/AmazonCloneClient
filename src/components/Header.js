import React from "react";
import "../Header.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useStateValue } from "../StateProvider";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { auth } from "../firebase";

function Header() {

  const [{ basket }] = useStateValue();
  const [{user}] = useStateValue();
  const handleAuthentication = () => {
  if(user){
    auth.signOut();
  }
  }

 
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon logo"
        />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello Guest</span>
          <span className="header__optionLineTwo">Sign In</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">&Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <div className="header__nav">
        <Link to="/login">
          <div className="header__option">
          <span className="header__optionLineOne">Hello Guest</span>
          <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign in'}</span>
        </div>
        </Link>
        </div>
        <div className="header__optionBasket">
        <Link to="/Checkout">
          <ShoppingBasketIcon />
          </Link>
          <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
