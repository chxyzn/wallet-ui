import { Card } from "./Card";

// TODO: test with incorrect data format
export class User {
  name: string;
  imgUrl: string;
  cards: Card[];

  constructor(name: string, imgUrl: string, cards: Card[]) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.cards = cards;
  }

  static fromJSON(json: any): User {
    const cards: Card[] = json.cards.map((cardJson: any) =>
      Card.fromJSON(cardJson)
    );

    return new User(json.name, json.imgUrl, cards);
  }
}
