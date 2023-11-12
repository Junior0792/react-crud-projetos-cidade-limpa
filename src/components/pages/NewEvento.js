import { useHistory } from "react-router-dom";

import styles from "./NewEvento.module.css";
import EventoForm from "../evento/EventoForm";

function NewEvento() {
  const history = useHistory();

  function createPost(evento) {
    evento.cost = 0;
    evento.services = [];

    fetch("http://localhost:5000/eventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        history.push("/eventos", { message: "Evento criado com sucesso!" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newevento_container}>
      <h1>Criar Evento</h1>
      <p>Crie um evento para depois adicionar os serviços</p>
      <EventoForm handleSubmit={createPost} btnText="Criar Evento" />
    </div>
  );
}

export default NewEvento;