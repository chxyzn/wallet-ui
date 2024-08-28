export class ChartData {
  labels: string[];
  data: number[];

  constructor(labels: string[], data: number[]) {
    this.labels = labels;
    this.data = data;
  }

  static fromJSON(json: any): ChartData {
    return new ChartData(json.labels, json.data);
  }
}
