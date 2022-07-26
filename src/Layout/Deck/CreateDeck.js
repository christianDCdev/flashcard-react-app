import React, { useState } from "react";
import { createDeck } from "../../utils/api";
import { useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    createDeck(formData);
    setFormData(formData);
    history.push("/");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm
        formData={formData}
        setFormData={setFormData}
        submit={submitHandler}
      />
    </div>
  );
}

export default CreateDeck;
