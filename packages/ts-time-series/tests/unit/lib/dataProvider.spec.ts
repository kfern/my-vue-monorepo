import { expectType } from "ts-expect";
import { DataFrame } from "danfojs";
import { IMarketChartData } from "../../../src/types";
import {
  preprocessMarketChartData,
  helperGetMarketChartData,
  getDemoData,
} from "../../../src/lib/dataProvider";

const testDataFileName = "bitcoin_market_chart_eur_days_15.json";
const testDataRecordNumber = 15 * 24 + 1;

describe("market_chart", () => {
  it("los datos para los tests tienen la estructura esperada", () => {
    const fakeData: IMarketChartData = helperGetMarketChartData(
      testDataFileName
    );
    // Número de registros
    expect(fakeData.prices.length).toBe(testDataRecordNumber);
    expect(fakeData.market_caps.length).toBe(fakeData.prices.length);
    expect(fakeData.total_volumes.length).toBe(fakeData.prices.length);

    // Cada registro es un array con dos elementos: Un timestamp y un valor
    // El primer item de cada array es la misma fecha
    expect(fakeData.prices[0][0]).toBe(fakeData.market_caps[0][0]);
    expect(fakeData.prices[0][0]).toBe(fakeData.total_volumes[0][0]);
  });

  describe("preprocessMarketChartData", () => {
    it("Con datos simulados", () => {
      const fakeData: IMarketChartData = {
        prices: [
          [2, 2.1],
          [1, 1.1],
        ],
        market_caps: [
          [2, 2.2],
          [1, 1.2],
        ],
        total_volumes: [
          [2, 2.3],
          [1, 1.3],
        ],
      };

      const act = preprocessMarketChartData(fakeData); // ts: any aunque debería ser Dataframe

      // Devuelve un Dataframe. El ts por defecto no define la option download
      const act_json = act.to_json({ download: false });
      const expected_json = [
        { time: 1, price: 1.1, market_cap: 1.2, total_volume: 1.3 },
        { time: 2, price: 2.1, market_cap: 2.2, total_volume: 2.3 },
      ];
      expect(act_json).toStrictEqual(expected_json);
    });

    it("Con datos reales", () => {
      const fakeData: IMarketChartData = helperGetMarketChartData(
        testDataFileName
      );

      const act = preprocessMarketChartData(fakeData); // ts: any aunque debería ser Dataframe

      // Devuelve un Dataframe. El ts por defecto no define la option download
      const act_json = act.to_json({ download: false });
      expect(act_json).toMatchSnapshot();
    });
  });

  it("getDemoData", () => {
    const act = getDemoData();

    const colsExpected = ["time", "price", "market_cap", "total_volume"];
    expectType<DataFrame>(act);
    expect(act.columns).toStrictEqual(colsExpected); // Hay las columnas esperadas
    expect(act.shape).toStrictEqual([
      testDataRecordNumber,
      colsExpected.length,
    ]); // Hay los registros esperados
  });
});
