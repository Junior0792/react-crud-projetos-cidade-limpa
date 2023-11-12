import { v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Evento.module.css";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";
import EventoForm from "../evento/EventoForm";

function Evento() {
  const { id } = useParams();
  const [evento, setEvento] = useState([]);
  const [services, setServices] = useState([]);
  const [showEventoForm, setShowEventoForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(true);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/eventos/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setEvento(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, [id]);

  function editPost(evento) {
    setMessage("");

    if (evento.endereco < evento.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/eventos/${evento.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(evento),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setEvento(data);
        setShowEventoForm(false);
        setMessage("Evento atualizado!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function createService() {
    setMessage("");

    const lastService = evento.services[evento.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(evento.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(evento.endereco)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      evento.services.pop();
      return false;
    }

    evento.cost = newCost;

    fetch(`http://localhost:5000/eventos/${evento.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    })
      .then((resp) => resp.json())
      .then(() => {
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    setMessage("");

    const servicesUpdated = evento.services.filter(
      (service) => service.id !== id
    );

    const eventoUpdated = evento;

    eventoUpdated.services = servicesUpdated;
    eventoUpdated.cost = parseFloat(eventoUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/eventos/${eventoUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventoUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setEvento(eventoUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  function toggleEventoForm() {
    setShowEventoForm(!showEventoForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {evento.name ? (
        <div className={styles.evento_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}

            <div className={styles.details_container}>
              <h1>Eventos: {evento.name}</h1>
              <button className={styles.btn} onClick={toggleEventoForm}>
                {!showEventoForm ? "Editar evento" : "Fechar"}
              </button>

              {!showEventoForm ? (
                <div className={styles.evento_info}>
                  <p>
                    <span>Tipo de evento:</span> {evento.category.name}
                  </p>

                  <p>
                    <span>Endereço:</span> {evento.endereco}
                  </p>

                  <p>
                    <span>Quantidade de serviços:</span> {evento.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.evento_info}>
                  <EventoForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={evento}
                  />
                </div>
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>

              <div className={styles.evento_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={evento}
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

export default Evento;