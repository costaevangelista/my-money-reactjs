import React from "react";
import Meses from "./Meses";
import AdicionarMes from "./AdicionarMes";

const Home = () => {
  return (
    <div className="container">
      <div className="card m-2">
        <div className="card-header font-weight-bolder">Adicionar Mês</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <AdicionarMes />
          </li>
          <li className="list-group-item">
            <Meses />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
