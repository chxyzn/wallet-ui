interface Transaction {
  [month: string]: number[];
}
export class Card {
  number: string;
  balance: number;
  currency: string;
  currencyFlagImgUrl: string;
  validity: string;
  cardType: string;
  months: string[];
  transactions: number[][];

  constructor(
    number: string,
    balance: number,
    currency: string,
    validity: string,
    cardType: string,
    currencyFlagImgUrl: string,
    months: string[],
    transactions: number[][]
  ) {
    this.number = number;
    this.balance = balance;
    this.currency = currency;
    this.validity = validity;
    this.cardType = cardType;
    this.currencyFlagImgUrl = currencyFlagImgUrl;
    this.months = months;
    this.transactions = transactions;
  }

  static fromJSON(json: any): Card {
    return new Card(
      json.number,
      json.balance,
      json.currency,
      json.validity,
      json.cardType,
      json.currencyFlagImgUrl,
      json.months,
      json.transactions
    );
  }
}
