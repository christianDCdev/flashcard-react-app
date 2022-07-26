import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardsForm from "./CardsForm";

function AddCard() {
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    
    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const submitHandler = (event) => {
    event.preventDefault();
    createCard(deckId, formData);
    setFormData(formData);
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h2>{deck.name}: Add Card</h2>

      <CardsForm
        formData={formData}
        setFormData={setFormData}
        submit={submitHandler}
      />
    </div>
  );
}

export default AddCard;
