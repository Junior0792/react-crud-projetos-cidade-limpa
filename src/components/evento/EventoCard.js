import styles from "./EventoCard.module.css";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function EventoCard({ id, name, endereco, nomeEvento, data, hora, category, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className={styles.evento_card}>
      <h4>{name}</h4>

      <p>
        <span>Endereço: </span> {endereco}
      </p>

      <p>
        <span>Nome do Evento: </span> {nomeEvento}
      </p>

      <p>
        <span>Data: </span> {data}
      </p>

      <p>
        <span>Hora: </span> {hora}
      </p>

      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>

      <div className={styles.evento_card_actions}>
        <Link to={`/evento/${id}`}>
          <BsPencil /> Editar
        </Link>

        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

export default EventoCard;