import { Link } from "react-router-dom";

import Container from "./Container";

import styles from "./Navbar.module.css";
import logo from "../../img/logotipo-cidade-limpa.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="" className={styles.logo} />
        </Link>

        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Inicio</Link>
          </li>
          <li className={styles.item}>
            <Link to="/solicitacoes">Solicitações</Link>
          </li>
          <li className={styles.item}>
            <Link to="/eventos">Eventos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/buscarlixeiras">Buscar Lixeiras</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
