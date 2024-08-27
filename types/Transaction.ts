export class Transaction {
  amount: number;
  user: string;
  timestamp: string;
  type: number;

  constructor(amount: number, user: string, timestamp: string, type: number) {
    this.amount = amount;
    this.user = user;
    this.timestamp = timestamp;
    this.type = type;
  }

  static fromJSON(json: any): Transaction {
    return new Transaction(json.amount, json.user, json.timestamp, json.type);
  }
}
