import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";

const minAno = 2019;
const maxAno = 2022;

const AdicionarMes = () => {
  const refAno = useRef();
  const refMes = useRef();
  const [redir, setRedir] = useState("");

  const anos = [];
  const meses = [];

  for (let i = minAno; i <= maxAno; i++) {
    anos.push(i);
  }
  for (let i = 1; i <= 12; i++) {
    meses.push(i);
  }

  const zeroPad = num => {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  };

  const verMes = () => {
    setRedir(refAno.current.value + "-" + refMes.current.value);
  };
  if (redir !== "") {
    return <Redirect to={"movimentacoes/" + redir} />;
  }

  return (
    <>
      <div className="form-inline">
        <select ref={refAno} name="ano" className="form-control m-1">
          {anos.map(ano => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
        <select ref={refMes} className="form-control m-1">
          {meses.map(zeroPad).map(mes => (
            <option name="mes" key={mes} value={mes}>
              {mes}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={verMes}>
          Adicionar mês
        </button>
      </div>
    </>
  );
};

export default AdicionarMes;
