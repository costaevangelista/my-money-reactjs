import React from "react";
import { Link } from "react-router-dom";
import Rest from "../../utils/rest";

const baseURL = "https://mymoney-costawebs.firebaseio.com/";
const { useGet } = Rest(baseURL);

const Meses = () => {
  const data = useGet("meses");

  if (data.loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (Object.keys(data.data).length > 0) {
    return (
      <table className="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Mês</th>
            <th className="text-right">Previsão Entrada</th>
            <th className="text-right">Entrada</th>

            <th className="text-right">Previsão Saída</th>
            <th className="text-right">Saídas</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(data.data).map(mes => {
            return (
              <tr key={mes}>
                <td className="text-center">
                  <Link to={`/movimentacoes/${mes}`}> {mes}</Link>
                </td>
                <td className="text-right">
                  {data.data[mes].previsao_entrada}
                </td>
                <td className="text-right">{data.data[mes].entradas}</td>
                <td className="text-right">{data.data[mes].previsao_saida}</td>
                <td className="text-right">{data.data[mes].saidas}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return null;
};

export default Meses;
