import { useHistory } from "react-router-dom";
import SolicitacaoForm from "../solicitacao/SolicitacaoForm";

import styles from "./NewSolicitacao.module.css";

function NewSolicitacao() {
  const history = useHistory();

  function createPost(solicitacao) {
    solicitacao.cost = 0;
    solicitacao.services = [];


    fetch("http://localhost:5000/solicitacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solicitacao),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        history.push("/solicitacoes", { message: "Solicitação criada com sucesso!" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newsolicitacao_container}>
      <h1>Criar Solicitação</h1>
      <p>Crie uma solicitação para depois adicionar os serviços</p>
      <SolicitacaoForm handleSubmit={createPost} btnText="Criar Solicitação" />
    </div>
  );
}

export default NewSolicitacao;
