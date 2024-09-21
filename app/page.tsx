"use client";

import Image from "next/image";
import { Card } from "./lib/card";
import { Deck } from "./lib/deck";
import { useRef, useState } from "react";

export default function Home() {
  const deckRef = useRef<Deck>(new Deck());

  const [currentCard, setCurrentCard] = useState<Card>(
    deckRef.current.currentCard
  );
  const [lastCard, setLastCard] = useState<Card | null>(null);

  const [schlurken, setSchlurken] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [animateCard, setAnimateCard] = useState<boolean>(false);
  const [disabledButtons, setDisabledButtons] = useState<boolean>(false);

  const increaseSchlurken = () => {
    setSchlurken(schlurken + 1);
    setScore(score + 1);
  };

  const resetSchlurken = () => {
    setSchlurken(1);
    setScore(0);
  };

  const YIKES = () => {
    alert(`YIKES!! \nThrinken ${schlurken} Schlucken...`);
  };

  function handleUeberUnter(ueberUnter: boolean) {
    setLastCard(currentCard);
    setCurrentCard(deckRef.current.currentCard);
    setAnimateCard(true);
    if (ueberUnter) {
      increaseSchlurken();
    } else {
      //trigger YIKES
      setTimeout(() => {
        YIKES();
        resetSchlurken();
        deckRef.current.shuffleDeck();
        setCurrentCard(deckRef.current.currentCard);
      }, 500);
    }
    setTimeout(() => {
      setAnimateCard(false);
      setDisabledButtons(false);
    }, 500);
  }

  const handleUeber = () => {
    setDisabledButtons(true);
    const oldCard = currentCard;
    const newCard = deckRef.current.drawCard();
    const isUeber = newCard.compare(oldCard) >= 0;

    handleUeberUnter(isUeber);
  };

  const handleUnter = () => {
    setDisabledButtons(true);
    const oldCard = currentCard;
    const newCard = deckRef.current.drawCard();
    const isUnter = newCard.compare(oldCard) <= 0;

    handleUeberUnter(isUnter);
  };

  const handlePassieren = () => {
    setScore(0);
    alert(
      `Sind Sie bereit? 
      \nDas Spiel ist bei ${schlurken} bis Schlucken. 
      \nErraten Sie die nächsten 3 Karten um sie zu senden.`
    );
  };

  return (
    <div className="w-screen h-screen bg-emerald-500 text-white pt-8 font-semibold">
      <main className="flex flex-col items-center gap-y-2">
        <div className="bg-emerald-700 p-6 px-8 w-3/4 text-3xl rounded-md mb-4">
          Schlurken: {schlurken}
        </div>
        {currentCard && (
          <div className="relative w-1/2 h-80">
            <Image
              src={currentCard.getImageFile()}
              alt={"Image of current card"}
              width={100}
              height={200}
              className={`z-50 absolute inset-0 mx-auto my-auto shadow-md w-fit ${
                animateCard && "animate-bounce"
              }`}
            />
            {lastCard && (
              <Image
                src={lastCard.getImageFile()}
                alt={"Image of current card"}
                width={100}
                height={200}
                className="z-0 absolute inset-0 mx-auto my-auto shadow-md w-fit"
              />
            )}
          </div>
        )}
        <div className="w-full p-4 flex justify-evenly">
          <button
            className="bg-lime-500 rounded-md shadow-md p-4 w-1/3 text-xl font-semibold"
            onClick={handleUeber}
            disabled={disabledButtons}
          >
            Über
          </button>
          <button
            className="bg-rose-500 rounded-md shadow-md p-4 w-1/3 text-xl font-semibold"
            onClick={handleUnter}
            disabled={disabledButtons}
          >
            Unter
          </button>
        </div>
        {score >= 3 && (
          <button
            className="bg-amber-500 rounded-md shadow-md p-4 w-2/3 text-xl font-semibold"
            onClick={handlePassieren}
            disabled={disabledButtons}
          >
            Passieren
          </button>
        )}
      </main>
    </div>
  );
}
