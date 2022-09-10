import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(createNumbers());

  const [won, setWon] = useState(false);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setWon(true);
    }
  }, [dice]);

  function createNumbers() {
    const numbersArr = [];

    for (let i = 1; i <= 10; i++) {
      numbersArr.push(generateNewDie());
    }

    return numbersArr;
  }

  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice() {
    if (!won) {
      setCount((prevCount) => prevCount + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setWon(false);
      setCount(0);
      setDice(createNumbers());
    }
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        value={die.value}
        key={die.id}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  return (
    <main className="container">
      {won && <Confetti />}
      <h2 className="title">Tenzies</h2>
      <div className="dice-container">{diceElements}</div>
      <p className="num-rolls">Number of Rolls : {count} </p>
      <p className="highscore">HighScore : 0 </p>
      <button className="btn-roll" onClick={rollDice}>
        {!won ? "Roll Dice" : "New Game"}
      </button>
    </main>
  );
}
