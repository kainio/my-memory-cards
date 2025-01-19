
import React from "react";
import cardcover from "./assets/cards/cardBack_blue3.png";
import cardcoverplayed from "./assets/cards/cardBack_red3.png";

import "./card.css";


const Card = ({ onClick, card, index, isAlreadyPlayed, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };
  const getClasses = () =>{
    let classes = "card"
    if (isFlipped) {
      classes += " is-flipped"
    }

    if(isAlreadyPlayed) {
      classes += " is-already-played"
    }

    return classes;
  }

  const getCardCover = () => {
    if(isAlreadyPlayed) {
      return cardcoverplayed;
    }
    return cardcover;
  }
  return (
    <div
      className={getClasses()}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={getCardCover()} alt="cardcover" />

      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="cardface" />
      </div>
    </div>
  );
};

export default Card;