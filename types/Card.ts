export class Card {
  number: string;
  balance: number;
  currency: string;
  validity: string;
  cardType: string;

  constructor(
    number: string,
    balance: number,
    currency: string,
    validity: string,
    cardType: string
  ) {
    this.number = number;
    this.balance = balance;
    this.currency = currency;
    this.validity = validity;
    this.cardType = cardType;
  }

  static fromJSON(json: any): Card {
    return new Card(
      json.number,
      json.balance,
      json.currency,
      json.validity,
      json.cardType
    );
  }
}
