import { useState, useEffect } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

import styles from "./EventoForm.module.css";

function EventoForm({ handleSubmit, btnText, eventoData }) {
  const [categories, setCategories] = useState([]);
  const [evento, setEvento] = useState(eventoData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories2", {
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
    handleSubmit(evento);
  };

  function handleChange(e) {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setEvento({
      ...evento,
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
        value={evento.name ? evento.name : ""}
      />

      <Input
        type="text"
        text="Endereço"
        name="endereco"
        placeholder="Insira a endereço"
        handleOnChange={handleChange}
        value={evento.endereco ? evento.endereco : ""}
      />

        <Input
        type="text"
        text="Nome do evento"
        name="nomeEvento"
        placeholder="Insira o nome do evento"
        handleOnChange={handleChange}
        value={evento.nomeEvento ? evento.nomeEvento : ""}
      />

      <Input
        type="date"
        text="Data"
        name="data"
        placeholder="Insira a data do evento"
        handleOnChange={handleChange}
        value={evento.data ? evento.data : ""}
      />

      <Input
        type="time"
        text="Hora"
        name="hora"
        placeholder="Insira a hora do evento"
        handleOnChange={handleChange}
        value={evento.hora ? evento.hora : ""}
      />


      <Select
        name="category_id"
        text="Selecione o tipo de evento"
        options={categories}
        handleOnChange={handleCategory}
        value={evento.category ? evento.category.id : ""}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default EventoForm;