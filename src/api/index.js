import Rest from "../utils/rest";

const baseURL = "https://mymoney-costawebs.firebaseio.com/";
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL);

//hooks personalizados utilise (use+Name...)
const useMesApi = data => {
  const infoMes = useGet(`meses/${data}`);
  const [dataPatch, alterarMes] = usePatch(`meses/${data}`);
  return { infoMes, alterarMes };
};

const useMovimentacaoApi = data => {
  const movimentacoes = useGet(`movimentacoes/${data}`);
  const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${data}`);
  const [removeData, removerMovimentacao] = useDelete();
  return { movimentacoes, salvarNovaMovimentacao, removerMovimentacao };
};

export { useMesApi, useMovimentacaoApi };
