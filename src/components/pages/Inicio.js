import styles from "./Inicio.module.css";
import LinkButton from "../layout/LinkButton";
import LinkButton2 from "../layout/LinkButton2";


function Inicio() {
  return (
    <section className={styles.inicio_container}>
      <h1>
       <span> Bem-vindo a Cidade Limpa</span>
      </h1>
      <p>Promovendo a sustentabilidade e a comunicação direta com as autoridades municipais. Essa abordagem colaborativa contribui para o bem-estar da comunidade e para a construção de cidades mais limpas e saudáveis.</p>
      <div className={styles.buttonContainer}>
        <LinkButton to="newsolicitacao" text="Criar Solicitação" className={styles.linkButton} />
        <LinkButton2 to="newevento" text="Criar Evento" className={styles.linkButton} />
      </div>
    
    </section>
  );
}

export default Inicio;
