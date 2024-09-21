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

  const [schlurken, setSchlurken] = useState<number>(1);

  const increaseSchlurken = () => {
    setSchlurken(schlurken + 1);
  };

  const resetSchlurken = () => {
    setSchlurken(1);
  };

  const YIKES = () => {
    alert(`YIKES!!! Thrinken ${schlurken} Schlurken`);
  };

  const handleUeber = () => {
    const oldCard = currentCard;
    const newCard = deckRef.current.drawCard();
    const isUeber = newCard.compare(oldCard) >= 0;
    //wait before setting?
    if (isUeber) {
      increaseSchlurken();
      setCurrentCard(deckRef.current.currentCard);
    } else {
      //trigger YIKES
      YIKES();
      resetSchlurken();
      deckRef.current.shuffleDeck();
      setCurrentCard(deckRef.current.currentCard);
    }
  };

  const handleUnter = () => {
    const oldCard = currentCard;
    const newCard = deckRef.current.drawCard();
    const isUnter = newCard.compare(oldCard) <= 0;
    //wait before setting?
    if (isUnter) {
      increaseSchlurken();
      setCurrentCard(deckRef.current.currentCard);
    } else {
      //trigger YIKES
      YIKES();
      resetSchlurken();
      deckRef.current.shuffleDeck();
      setCurrentCard(deckRef.current.currentCard);
    }
  };

  return (
    <div className="w-screen h-screen bg-emerald-500 text-white pt-20">
      <main className="flex flex-col items-center gap-y-4">
        <div className="bg-emerald-700 p-10 w-2/3 text-3xl rounded-md">
          Schlurken: {schlurken}
        </div>
        {currentCard && (
          <div className="m-4 shadow-md w-fit">
            <Image
              src={currentCard.getImageFile()}
              alt={"Image of current card"}
              width={100}
              height={200}
            />
          </div>
        )}
        <div className="w-full p-4 flex justify-evenly">
          <button
            className="bg-blue-400 rounded-md shadow-md p-4 w-1/3 text-xl font-semibold"
            onClick={handleUnter}
          >
            Unter
          </button>
          <button
            className="bg-yellow-300 rounded-md shadow-md p-4 w-1/3 text-xl font-semibold"
            onClick={handleUeber}
          >
            Über
          </button>
        </div>
      </main>
    </div>
  );
}
