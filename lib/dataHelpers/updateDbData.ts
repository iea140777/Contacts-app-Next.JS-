import { readFileSync, writeFileSync } from "fs";

import { DbData } from "../../utils/types";

type DataByKey = DbData[keyof DbData];
type Handler = (data: DataByKey) => void;

export function updateDbData(handler: Handler, key: keyof DbData) {
  const data: DbData = JSON.parse(readFileSync("mockedDbData.json", "utf8"));
  const dataByKey: DataByKey = data[key];

  handler(dataByKey);
  const newData = {
    [key]: dataByKey,
    ...data,
  };
  const newDataJson = JSON.stringify(newData, null, " ");
  writeFileSync("mockedDbData.json", newDataJson);
}
