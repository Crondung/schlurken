export type CardColor = "CLUB" | "SPADE" | "DIAMOND" | "HEART";
export type CardNumber =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "JACK"
  | "QUEEN"
  | "KING";

export class Card {
  color: CardColor;
  number: CardNumber;
  constructor(color: CardColor, number: CardNumber) {
    this.color = color;
    this.number = number;
  }

  getImageFile(): string {
    return `cards/${this.color}-${this.number}.svg`;
  }

  public get value(): number {
    switch (this.number) {
      case "1":
        //Ace
        return 1;
      case "2":
        return 2;
      case "3":
        return 3;
      case "4":
        return 4;
      case "5":
        return 5;
      case "6":
        return 6;
      case "7":
        return 7;
      case "8":
        return 8;
      case "9":
        return 9;
      case "10":
        return 10;
      case "JACK":
        return 11;
      case "QUEEN":
        return 12;
      case "KING":
        return 13;
      default:
        return 0;
    }
  }

  /**
   * Compares this card with another card
   *
   * @param other Card to compare to
   * @returns >=1 if this card is bigger, <=-1 if this is smaller, 0 if same value
   */
  compare(other: Card): number {
    return this.value - other.value;
  }
}
