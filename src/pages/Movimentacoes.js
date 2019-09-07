import React, { useState } from "react";
import Rest from "../utils/rest";

const baseURL = "https://mymoney-costawebs.firebaseio.com/";
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL);

const Movimentacoes = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.data}`);
  const dataMeses = useGet(`meses/${match.params.data}`);
  const [dataPatch, patch] = usePatch();
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`);
  const [removeData, remover] = useDelete();
  const [disabledInputEntrada, setDisabledInputEntrada] = useState(true);
  const [disabledInputSaida, setDisabledInputSaida] = useState(true);

  const [form, setForm] = useState({ descricao: "", valor: "" });

  const onChangeForm = evt => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value
    });
  };

  const salvarMovimentacao = async () => {
    if (!isNaN(form.valor) && form.valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao: form.descricao,
        valor: parseFloat(form.valor)
      });
      setForm({ descricao: "", valor: "" });
      data.refetch();
      setTimeout(() => {
        dataMeses.refetch();
      }, 3000);
    }
  };

  const removerMovimentacao = async id => {
    await remover(`movimentacoes/${match.params.data}/${id}`);
    data.refetch();
    setTimeout(() => {
      dataMeses.refetch();
    }, 3000);
  };

  const alterPrevisaoEntrada = evt => {
    patch(`meses/${match.params.data}`, {
      previsao_entrada: evt.target.value
    });
    setTimeout(() => {
      dataMeses.refetch();
    }, 3000);
  };

  const alterPrevisaoSaida = evt => {
    patch(`meses/${match.params.data}`, {
      previsao_saida: evt.target.value
    });
    setTimeout(() => {
      dataMeses.refetch();
    }, 3000);
  };

  const handleDisabled = tipo => {
    console.log(tipo);
    if (tipo === 1) {
      setDisabledInputEntrada(false);
    }
    if (tipo === 2) {
      setDisabledInputSaida(false);
    }
  };
  return (
    <div className="container p-2">
      <div className="card">
        <div className="card-header font-weight-bolder">Movimentações</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {!dataMeses.loading && dataMeses.data && (
              <div className="form-inline">
                Previsão entrada: {dataMeses.data.previsao_entrada}
                <input
                  className="form-control col-md-1 m-2"
                  placeholder=""
                  type="text"
                  name="previsao_entrada"
                  onClick={() => handleDisabled(1)}
                  onBlur={alterPrevisaoEntrada}
                ></input>
                Previsão de saída: {dataMeses.data.previsao_saida}
                <input
                  className="form-control col-md-1 m-2"
                  placeholder=""
                  type="text"
                  name="previsao_saida"
                  onBlur={alterPrevisaoSaida}
                />
                Entrada:
                <h5>
                  <span className="badge badge-primary m-1 p-2">
                    {dataMeses.data.entradas}
                  </span>
                </h5>
                Saída:
                <h5>
                  <span className="badge badge-danger m-1 p-2">
                    {dataMeses.data.saidas}
                  </span>
                </h5>
              </div>
            )}
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
                {data.data &&
                  Object.keys(data.data).map(movimentacao => {
                    return (
                      <tr key={movimentacao}>
                        <td>{data.data[movimentacao].descricao}</td>
                        <td className="text-right">
                          {data.data[movimentacao].valor}{" "}
                          <button
                            className="btn btn-danger"
                            onClick={() => removerMovimentacao(movimentacao)}
                          >
                            -
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
      <div className="card">
        <div className="card-header font-weight-bolder">Novo Lançamento</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="form-row">
              <div className="form-group col-md-8">
                <input
                  className="form-control"
                  placeholder="Descrição"
                  type="text"
                  name="descricao"
                  value={form.descricao}
                  onChange={onChangeForm}
                />
              </div>
              <div className="form-group col-md-4">
                <input
                  className="form-control"
                  placeholder="Valor"
                  type="text"
                  name="valor"
                  value={form.valor}
                  onChange={onChangeForm}
                ></input>
              </div>
              <div className="form-group col-md-12">
                <button
                  className="btn btn-success btn-block"
                  onClick={salvarMovimentacao}
                >
                  + Adicionar
                </button>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Movimentacoes;
