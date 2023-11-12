import styles from "./SolicitacaoCard.module.css";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function SolicitacaoCard({ id, name, endereco, nomeSolicitacao, descricao, category, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className={styles.solicitacao_card}>
      <h4>{name}</h4>

      <p>
        <span>Endereço: </span> {endereco}
      </p>

      <p>
        <span>Nome da solicitação: </span> {nomeSolicitacao}
      </p>

      <p>
        <span>Descrição: </span> {descricao}
      </p>

      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>

      <div className={styles.solicitacao_card_actions}>
        <Link to={`/solicitacao/${id}`}>
          <BsPencil /> Editar
        </Link>

        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

export default SolicitacaoCard;