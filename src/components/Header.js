import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
const Header = () => {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, [logado]);

  const logout = () => {
    localStorage.removeItem("token");
    setLogado(false);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-light bg-info">
      <div className="container">
        <Link to="/" className="navbar-brand text-white font-weight-bolder">
          MyMoney
        </Link>
        {logado && (
          <li className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-link-primary text-white my-2 my-sm-0"
              type="button"
              onClick={logout}
            >
              Sair
            </button>
          </li>
        )}
      </div>
    </nav>
  );
};

export default Header;
