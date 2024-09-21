import { Card, CardColor, CardNumber } from "./card";

export class Deck {
  playedCards: Card[] = [];
  unplayedCards: Card[] = [];

  constructor() {
    this.initCards();
    this.drawCard();
  }

  public get currentCard(): Card {
    if (this.playedCards.length === 0) {
      this.drawCard();
    }
    return this.playedCards[this.playedCards.length - 1];
  }

  initCards() {
    this.playedCards = [];
    this.unplayedCards = [];
    const cardColors: CardColor[] = ["CLUB", "DIAMOND", "HEART", "SPADE"];
    const cardNumbers: CardNumber[] = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "JACK",
      "QUEEN",
      "KING",
    ];
    for (const color of cardColors) {
      for (const number of cardNumbers) {
        const card = new Card(color, number);
        this.unplayedCards.push(card);
      }
    }
  }

  shuffleDeck() {
    this.initCards();
    this.drawCard();
  }

  drawCard(): Card {
    if (this.unplayedCards.length === 0) {
      this.initCards();
    }
    const index = Math.floor(Math.random() * this.unplayedCards.length);
    const drawnCard = this.unplayedCards[index];
    this.unplayedCards.splice(index, 1);
    this.playedCards.push(drawnCard);
    return drawnCard;
  }
}
