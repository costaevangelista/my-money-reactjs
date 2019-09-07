import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="navbar navbar-light bg-info">
      <div className="container">
        <Link to="/" className="navbar-brand text-white font-weight-bolder">
          MyMoney
        </Link>
      </div>
    </nav>
  );
};

export default Header;
