import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

function Deck() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
      setCards(response.cards);
    }

    loadDecks();
    return () => abortController.abort();
  }, [deckId]);

  const deleteDeckHandler = async (deckId) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  const deleteCardHandler = async (cardId) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(cardId);
      window.location.reload(false);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary ml-2">
          Study
        </Link>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary ml-2"
        >
          Add Cards
        </Link>
        <button
          className="btn btn-danger ml-2"
          onClick={() => deleteDeckHandler(deckId)}
        >
          Delete
        </button>
      </div>

      <br />

      <div>
        <h2>Cards</h2>

        {cards.map((card, index) => {
          return (
            <div className="card" key={index}>
              <div className="card-body">
                <p className="card-text">{card.front}</p>
                <p className="card-text my-4">{card.back}</p>
                <Link
                  to={`./${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => deleteCardHandler(card.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Deck;
