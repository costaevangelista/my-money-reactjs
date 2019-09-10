import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { usePost } from "../../utils/rest";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJatwU9I6UYQZPcZ23jmsaGRZOnrTBOAc&fbclid=1:865259063:web:92ab33cf5ae3b38fe8f9b2";

const Login = () => {
  const [postData, signin] = usePost(url);
  const [logado, setLogado] = useState(false);
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });

  useEffect(() => {
    if (postData.data.idToken) {
      localStorage.setItem("token", postData.data.idToken);
      setLogado(true);
      window.location.assign("/");
    }
  }, [postData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogado(true);
      window.location.assign("/");
    }
  }, []);

  const login = async () => {
    await signin({
      email: formLogin.email,
      password: formLogin.password,
      returnSecureToken: true
    });
  };

  const onChangeForm = evt => {
    setFormLogin({
      ...formLogin,
      [evt.target.name]: evt.target.value
    });
  };

  if (logado) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <span className="row justify-content-md-center">
        <span className="col-5">
          <div className="card m-2">
            <div className="card-header p-4 bg-info">
              <h5 className="text-center font-weight-bold text-white">
                Tela de Login
              </h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="form-group">
                  {postData.data !== "" && postData.code === 400 && (
                    <p className="text-danger">E-mail /ou password inválido.</p>
                  )}
                  <input
                    type="email"
                    value={formLogin.email}
                    className="form-control"
                    name="email"
                    placeholder="E-mail"
                    onChange={onChangeForm}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={formLogin.password}
                    className="form-control "
                    name="password"
                    placeholder="Password"
                    onChange={onChangeForm}
                  />
                </div>
              </li>
              <li className="list-group-item">
                <button
                  type="button"
                  onClick={login}
                  className="btn btn-primary btn-block"
                >
                  Logar
                </button>
              </li>
            </ul>
          </div>
        </span>
      </span>
    </div>
  );
};

export default Login;
