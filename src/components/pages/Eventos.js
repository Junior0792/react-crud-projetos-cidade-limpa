import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Container from "../layout/Container";
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import EventoCard from "../evento/EventoCard";

import styles from "./Eventos.module.css";
import LinkButton2 from "../layout/LinkButton2";

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [eventoMessage, setEventoMessage] = useState("");


  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/eventos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setEventos(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, []);

  function removeEvento(id) {
    fetch(`http://localhost:5000/eventos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setEventos(eventos.filter((evento) => evento.id !== id));
        setEventoMessage("Evento removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.evento_container}>
      <div className={styles.title_container}>
        <h1>Meus eventos</h1>
        <LinkButton2 to="/newevento" text="Criar evento" />
      </div>

      {message && <Message msg={message} type="success" />}
      {eventoMessage && <Message msg={eventoMessage} type="success" />}

      <Container customClass="start">
        {eventos.length > 0 &&
          eventos.map((evento) => (
            <EventoCard
              id={evento.id}
              name={evento.name}
              endereco={evento.endereco}
              nomeEvento={evento.nomeEvento}
              data={evento.data}
              hora={evento.hora}
              category={evento.category.name}
              key={evento.id}
              handleRemove={removeEvento}
            />
          ))}

        {!removeLoading && <Loading />}

        {removeLoading && eventos.length === 0 && (
          <p>Não há solicitações cadastradas!</p>
        )}
      </Container>
    </div>
  );
}

export default Eventos;