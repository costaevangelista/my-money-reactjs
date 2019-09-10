import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMovimentacaoApi } from "../../api";
import InfoMes from "./InfoMes";
import AdicionarMovimentacao from "./AdicionarMovimentacao";

const Movimentacoes = ({ match }) => {
  const [dataInfoMes, setDataInfoMes] = useState(true);
  const {
    movimentacoes,
    salvarNovaMovimentacao,
    removerMovimentacao
  } = useMovimentacaoApi(match.params.data);

  const salvarMovimentacao = async dados => {
    await salvarNovaMovimentacao(dados);
    movimentacoes.refetch();
    setDataInfoMes(!dataInfoMes);
  };

  const remover = async id => {
    await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`);
    movimentacoes.refetch();
    setDataInfoMes(!dataInfoMes);
  };

  //return <pre>{JSON.stringify(data.data)} </pre>;

  if (movimentacoes.code === 401) {
    return <Redirect to="/login" />;
  }

  if (movimentacoes.code !== 401) {
    return (
      <div className="container p-2">
        <div className="card">
          <div className="card-header font-weight-bolder">Movimentações</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <InfoMes data={match.params.data} dataInfoMes={dataInfoMes} />
            </li>
            <li className="list-group-item">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr className="bg-light">
                    <th>Descrição</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {movimentacoes.data &&
                    Object.keys(movimentacoes.data).map(movimentacao => {
                      return (
                        <tr key={movimentacao}>
                          <td>{movimentacoes.data[movimentacao].descricao}</td>
                          <td className="text-right">
                            {movimentacoes.data[movimentacao].valor}{" "}
                            <button
                              className="btn btn-danger"
                              onClick={() => remover(movimentacao)}
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </li>
          </ul>
        </div>
        <hr />
        <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />
      </div>
    );
  }
};

export default Movimentacoes;
