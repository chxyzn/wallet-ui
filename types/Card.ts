export class Card {
  number: string;
  accountNumber: string;
  balance: number;
  currency: string;
  currencyFlagImgUrl: string;
  validity: string;
  cardType: string;
  months: string[];
  transactions: number[][];
  color: string;

  constructor(
    number: string,
    accountNumber: string,
    balance: number,
    currency: string,
    validity: string,
    cardType: string,
    currencyFlagImgUrl: string,
    months: string[],
    transactions: number[][],
    color: string
  ) {
    this.number = number;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.currency = currency;
    this.validity = validity;
    this.cardType = cardType;
    this.currencyFlagImgUrl = currencyFlagImgUrl;
    this.months = months;
    this.transactions = transactions;
    this.color = color;
  }

  static fromJSON(json: any): Card {
    var months: string[] = [];

    return new Card(
      json.number,
      json.accountNumber,
      json.balance,
      json.currency,
      json.validity,
      json.cardType,
      json.currencyFlagImgUrl,
      json.months,
      json.transactions,
      json.color
    );
  }
}
