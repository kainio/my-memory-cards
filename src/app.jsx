import shuffle from "./utils"
import { useEffect, useState, useRef } from "react";
import "./app.css";

import cardJoker from "./assets/cards/cardJoker.png";
import cardSpadesA from "./assets/cards/cardSpadesA.png";
import cardSpadesJ from "./assets/cards/cardSpadesJ.png";
import cardSpadesK from "./assets/cards/cardSpadesK.png";
import cardSpadesQ from "./assets/cards/cardSpadesQ.png";
import cardHeartsA from "./assets/cards/cardHeartsA.png";
import cardHeartsJ from "./assets/cards/cardHeartsJ.png";
import cardHeartsK from "./assets/cards/cardHeartsK.png";
import cardHeartsQ from "./assets/cards/cardHeartsQ.png";


import Card from "./card";

const CARDS = [
  {
    type: "Joker",
    image: cardJoker,
  },
  {
    type: "A",
    image: cardSpadesA,

  },
  {
    type: "J",
    image: cardSpadesJ,

  },
  {
    type: "K",
    image: cardSpadesK,

  },
  {
    type: "Q",
    image: cardSpadesQ,

  },
  {
    type: "A",
    image: cardHeartsA,

  },
  {
    type: "J",
    image: cardHeartsJ,

  },
  {
    type: "K",
    image: cardHeartsK,

  },
  {
    type: "Q",
    image: cardHeartsQ,

  }
];


export default function App() {

  const [cards, setCards] = useState(
    shuffle.bind(null, CARDS)
  );

  const [openCards, setOpenCards] = useState([]);

  const [playedCards, setPlayedCards] = useState([]);
  const [jokerFound, setJokerFound] = useState(false);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [shouldFlippAllCards, setShouldFlippAllCards] = useState(false);

  const [GameOver, setGameOver] = useState(false);

  const timeout = useRef(null);

  const checkGameOver = () => {
    console.log(cards.filter(c => c.type != "Joker"))
    console.log(Object.keys(playedCards).length)
    if ( Object.keys(playedCards).length == (cards.filter(c => c.type != "Joker").length/2)) {
      setGameOver(true);
      setShouldFlippAllCards(true);

    }
  };

  const checkJoker = () => {
    let card = null
    setShouldDisableAllCards(false);

    if(openCards.length == 1)
    {
      card = cards[openCards[0]];
    } else if (openCards.length == 2){
      card = cards[openCards[1]];
    }

    if(card != null && card.type == "Joker") {
      setJokerFound(true);

    }

  }
  const check = () => {
    const [first, second] = openCards;
    setShouldDisableAllCards(false);
    console.log(openCards)
    checkJoker()

    if (cards[first].type === cards[second].type) {

      setPlayedCards((prev) => ({ ...prev, [cards[first].type]: true }));

      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {

      setOpenCards((prev) => [...prev, index]);
      setShouldDisableAllCards(true);
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };


  useEffect(() => {
    let timeout = null;
    if(!jokerFound){
      if (openCards.length == 1) {
        timeout = setTimeout(checkJoker, 300);

      } else if (openCards.length == 2) {
        timeout = setTimeout(check, 300);
      }
      return () => {
        clearTimeout(timeout);
    }

    };
  }, [openCards]);

  useEffect(() => {
    checkGameOver();

  }, [playedCards]);

  useEffect(() => {
    handleRestart();
    console.log("jocker found")
  }, [jokerFound]);



  const checkIsFlipped = (index) => {

    return openCards.includes(index);
  };

  const checkIsAlreadyPlayed = (card) => {
    return Boolean(playedCards[card.type]);
  };


  const handleRestart = () => {
    setShouldFlippAllCards(false);

    setPlayedCards({});
    setOpenCards([]);
    setJokerFound(false)
    setShouldDisableAllCards(false);
    setCards(shuffle.bind(null, CARDS));
  };


  return (
    <div className="App">
    <header>
      <h2>L9a jooj titchabho mn kolla Nou3</h2>
      <p>
        7di rassk lay ghdar bik Joke rah til3ab solo ma 3ando khoh
      </p>
    </header>
    <div className="container">
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            card={card}
            index={index}
            isDisabled={shouldDisableAllCards}
            isAlreadyPlayed={checkIsAlreadyPlayed(card)}
            isFlipped={shouldFlippAllCards || checkIsFlipped(index)}
            onClick={handleCardClick}
          />
        );
      })}
    </div>
    <footer>
      <div className="restart">
        <button onClick={handleRestart} >
          Restart
        </button>
      </div>
    </footer>
    </div>
  );
}
