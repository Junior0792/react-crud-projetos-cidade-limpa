import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import Message from "../layout/Message";
import SolicitacaoCard from "../solicitacao/SolicitacaoCard";
import Loading from "../layout/Loading";

import styles from "./Solicitacoes.module.css";

function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [solicitacaoMessage, setSolicitacaoMessage] = useState("");

  console.log(solicitacoes);


  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/solicitacoes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setSolicitacoes(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, []);

  function removeSolicitacao(id) {
    fetch(`http://localhost:5000/solicitacoes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setSolicitacoes(solicitacoes.filter((solicitacao) => solicitacao.id !== id));
        setSolicitacaoMessage("Solicitação removida com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.solicitacao_container}>
      <div className={styles.title_container}>
        <h1>Minhas solicitaçoes</h1>
        <LinkButton to="/newsolicitacao" text="Criar solicitação" />
      </div>

      {message && <Message msg={message} type="success" />}
      {solicitacaoMessage && <Message msg={solicitacaoMessage} type="success" />}

      <Container customClass="start">
        {solicitacoes.length > 0 &&
          solicitacoes.map((solicitacao) => (
            <SolicitacaoCard
              id={solicitacao.id}
              name={solicitacao.name}
              endereco={solicitacao.endereco}
              nomeSolicitacao={solicitacao.nomeSolicitacao}
              descricao={solicitacao.descricao}
              category={solicitacao.category?.name || ''} 
              key={solicitacao.id}
              handleRemove={removeSolicitacao}
            />
          ))}

        {!removeLoading && <Loading />}

        {removeLoading && solicitacoes.length === 0 && (
          <p>Não há solicitações cadastradas!</p>
        )}
      </Container>
    </div>
  );
}

export default Solicitacoes;
