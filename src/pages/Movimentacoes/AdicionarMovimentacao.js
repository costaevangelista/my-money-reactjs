import React, { useState } from "react";

const AdicionarMovimentacao = ({ salvarNovaMovimentacao }) => {
  //gestão formulario
  const [form, setForm] = useState({ descricao: "", valor: "" });

  const onChangeForm = evt => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value
    });
  };

  const salvarMovimentacao = async () => {
    if (!isNaN(form.valor) && form.valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      console.log(form);
      await salvarNovaMovimentacao({
        descricao: form.descricao,
        valor: parseFloat(form.valor)
      });
      setForm({ descricao: "", valor: "" });
      //infoMes.refetch();
    }
  };

  return (
    <>
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
    </>
  );
};

export default AdicionarMovimentacao;
