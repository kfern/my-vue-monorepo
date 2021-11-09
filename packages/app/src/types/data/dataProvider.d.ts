export interface IMarketChartData {
  prices: number[][]; // timestamp, value
  market_caps: number[][]; // timestamp, value
  total_volumes: number[][]; // timestamp, value
}
