import { useState, useEffect } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

import styles from "./SolicitacaoForm.module.css";

function SolicitacaoForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [solicitacao, setSolicitacao] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(solicitacao);
  };

  function handleChange(e) {
    setSolicitacao({ ...solicitacao, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setSolicitacao({
      ...solicitacao,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do solicitante"
        name="name"
        placeholder="Insira seu nome"
        handleOnChange={handleChange}
        value={solicitacao.name ? solicitacao.name : ""}
      />

      <Input
        type="text"
        text="Endereço"
        name="endereco"
        placeholder="Insira a endereço"
        handleOnChange={handleChange}
        value={solicitacao.endereco ? solicitacao.endereco : ""}
      />

       <Input
        type="text"
        text="Nome da solicitação"
        name="nomeSolicitacao"
        placeholder="Insira o nome da solicitação"
        handleOnChange={handleChange}
        value={solicitacao.nomeSolicitacao ? solicitacao.nomeSolicitacao : ""}
      />

      <Input
        type="text"
        text="Descrição da solicitação"
        name="descricao"
        placeholder="Insira a data do evento"
        handleOnChange={handleChange}
        value={solicitacao.descricao ? solicitacao.descricao : ""}
      />

      <Select
        name="category_id"
        text="Selecione o tipo de solicitação"
        options={categories}
        handleOnChange={handleCategory}
        value={solicitacao.category ? solicitacao.category.id : ""}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default SolicitacaoForm;
