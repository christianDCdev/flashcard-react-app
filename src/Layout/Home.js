import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      const result = await listDecks(abortController.signal);
      setDecks(result);
    }
    loadDecks();
    return () => abortController.abort();
  }, [decks.length]);

  const deleteHandler = async (deckId) => {
    if (
      window.confirm(
        "Delete this deck?\n\n You will not be able to recover it."
      )
    ) {
      await deleteDeck(deckId);
      setDecks(() => decks.filter((deck) => deck.id !== deckId));
    }
  };

  return (
    <div>
      <Link to="./decks/new">
        <button className="btn btn-secondary">Create Deck</button>
      </Link>

      {decks.map((deck, index) => {
        return (
          <div className="card mt-4" key={index}>
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {deck.cards.length} cards
              </h6>
              <p className="card-text">{deck.description}</p>
              <Link to={`decks/${deck.id}`} className="btn btn-secondary">
                View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mx-1"
              >
                Study
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => deleteHandler(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
