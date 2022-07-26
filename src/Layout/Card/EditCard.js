import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardsForm from "./CardsForm";

function EditCard() {
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({});
  const { deckId } = useParams();
  const { cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const deckRead = await readDeck(deckId, abortController.signal);
      setDeck(deckRead);
      const cardRead = await readCard(cardId, abortController.signal);
      setFormData(cardRead);
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId, cardId]);

  const submitHandler = (event) => {
    event.preventDefault();
    updateCard(formData);
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
            Edit card {cardId}
          </li>
        </ol>
      </nav>

      <h2>Edit Card</h2>
      <CardsForm
        formData={formData}
        setFormData={setFormData}
        submit={submitHandler}
      />
    </div>
  );
}

export default EditCard;
