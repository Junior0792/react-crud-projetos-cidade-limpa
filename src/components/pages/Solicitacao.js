import { v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Solicitacao.module.css";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import SolicitacaoForm from "../solicitacao/SolicitacaoForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Solicitacao() {
  const { id } = useParams();
  const [solicitacao, setSolicitacao] = useState([]);
  const [services, setServices] = useState([]);
  const [showSolicitacaoForm, setShowSolicitacaoForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(true);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/solicitacoes/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setSolicitacao(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, [id]);


  function editPost(solicitacao) {
    setMessage("");

    if (solicitacao.endereco < solicitacao.cost) {
      setMessage("");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/solicitacoes/${solicitacao.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(solicitacao),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setSolicitacao(data);
        setShowSolicitacaoForm(false);
        setMessage("Solicitação atualizada!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function createService() {
    setMessage("");

    const lastService = solicitacao.services[solicitacao.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(solicitacao.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(solicitacao.endereco)) {
      setMessage("");
      setType("error");
      solicitacao.services.pop();
      return false;
    }

    solicitacao.cost = newCost;

    fetch(`http://localhost:5000/solicitacoes/${solicitacao.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solicitacao),
    })
      .then((resp) => resp.json())
      .then(() => {
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    setMessage("");

    const servicesUpdated = solicitacao.services.filter(
      (service) => service.id !== id
    );

    const solicitacaoUpdated = solicitacao;

    solicitacaoUpdated.services = servicesUpdated;
    solicitacaoUpdated.cost = parseFloat(solicitacaoUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/solicitacoes/${solicitacaoUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solicitacaoUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setSolicitacao(solicitacaoUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  function toggleSolicitacaoForm() {
    setShowSolicitacaoForm(!showSolicitacaoForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {solicitacao.name ? (
        <div className={styles.solicitacao_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}

            <div className={styles.details_container}>
              <h1>Solicitações: {solicitacao.name}</h1>
              <button className={styles.btn} onClick={toggleSolicitacaoForm}>
                {!showSolicitacaoForm ? "Editar solicitação" : "Fechar"}
              </button>

              {!showSolicitacaoForm ? (
                <div className={styles.solicitacao_info}>
                  <p>
                    <span>Tipo de solicitação:</span> {solicitacao.category?.name || ''}
                  </p>

                  <p>
                    <span>Endereço:</span> {solicitacao.endereco}
                  </p>

                  <p>
                    <span>Quantidade de serviços:</span> {solicitacao.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.solicitacao_info}>
                  <SolicitacaoForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={solicitacao}
                  />
                </div>
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>

              <div className={styles.solicitacao_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={solicitacao}
                  />
                )}
              </div>
            </div>

            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Solicitacao;
