import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCard({ cards }) {
  const [card, setCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const history = useHistory();

  const nextCard = () => {
    if (card < cards.length - 1) {
      setCard(card + 1);
    } else {
      if (
        window.confirm(
          "Restart cards?\n\nClick 'cancel' to return to the home page."
        )
      ) {
        setCard(0);
      } else {
        history.push("/");
      }
    }
    setIsFlipped(false);
  };

  const isFlippedHandler = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card w-75">
      <div className="card-body">
        <h5 className="card-title">
          Card {card + 1} of {cards.length}
        </h5>
        <p className="card-text">
          {isFlipped ? cards[card].back : cards[card].front}
        </p>
        <button onClick={isFlippedHandler} className="btn btn-secondary">
          Flip
        </button>
        {isFlipped ? (
          <button onClick={() => nextCard()} className="btn btn-primary ml-2">
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default StudyCard;
