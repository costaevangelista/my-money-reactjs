import React, { useEffect } from "react";
import { useMesApi } from "../../api";

const InfoMes = ({ data, dataInfoMes }) => {
  const { infoMes, alterarMes } = useMesApi(data);
  useEffect(() => {
    setTimeout(() => {
      infoMes.refetch();
    }, 2000);
  }, [dataInfoMes]);
  const alterPrevisaoEntrada = evt => {
    alterarMes({
      previsao_entrada: evt.target.value
    });
    setTimeout(() => {
      infoMes.refetch();
    }, 2000);
  };

  const alterPrevisaoSaida = evt => {
    alterarMes({
      previsao_saida: evt.target.value
    });
    setTimeout(() => {
      infoMes.refetch();
    }, 2000);
  };

  if (infoMes.loading) {
    return <p>Carregando dados do mês {data}</p>;
  }

  if (infoMes.data) {
    return (
      <>
        <div className="form-inline">
          Previsão entrada: {infoMes.data.previsao_entrada}
          <input
            className="form-control col-md-1 m-2"
            placeholder=""
            type="text"
            name="previsao_entrada"
            onBlur={alterPrevisaoEntrada}
          ></input>
          Previsão de saída: {infoMes.data.previsao_saida}
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
              {infoMes.data.entradas}
            </span>
          </h5>
          Saída:
          <h5>
            <span className="badge badge-danger m-1 p-2">
              {infoMes.data.saidas}
            </span>
          </h5>
        </div>
      </>
    );
  }

  return null;
};

export default InfoMes;
