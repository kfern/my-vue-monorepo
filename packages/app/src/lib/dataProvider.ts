const fs = require("fs"); /* eslint-disable-line */
import { IMarketChartData } from "../types/index";
import { DataFrame } from "danfojs";
import demoData from "../../tests/data/bitcoin_market_chart_eur_days_15.json";

export const getDemoData = (): DataFrame => {
  // const fakeData: IMarketChartData = helperGetMarketChartData(fileName);
  const df = preprocessMarketChartData(demoData); // ts: any aunque debería ser Dataframe
  return df;
};

export const preprocessMarketChartData = (
  data: IMarketChartData
): /* eslint-disable-line */ any => {
  // @todo: El tipo devuelto debería ser Dataframe pero en la definicion ts de to_json falta el option download
  const df = new DataFrame(data.prices, { columns: ["time", "price"] });
  df.addColumn({
    column: "market_cap",
    values: data.market_caps.map((d) => d[1]),
    inplace: true,
  });
  df.addColumn({
    column: "total_volume",
    values: data.total_volumes.map((d) => d[1]),
    inplace: true,
  });

  df.set_index({ column: "time", drop: false, inplace: true });
  df.sort_index({ ascending: true, inplace: true });
  return df;
};

export const helperGetMarketChartData = (
  fileName: string
): IMarketChartData => {
  const file = `tests/data/${fileName}`;
  const rawdata = fs.readFileSync(file);
  const fakeData: IMarketChartData = JSON.parse(rawdata);
  return fakeData;
};
