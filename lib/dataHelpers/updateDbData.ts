import { readFileSync, writeFileSync } from "fs";
import path from "path";

import { DbData } from "../../utils/types";

type DataByKey = DbData[keyof DbData];
type Handler = (data: DataByKey) => void;

export function updateDbData(handler: Handler, key: keyof DbData) {
  const jsonDirectory = path.join(process.cwd(), "/tmp");
  const data: DbData = JSON.parse(
    readFileSync(jsonDirectory + "/mockedDbData.json", "utf8")
  );
  const dataByKey: DataByKey = data[key];

  handler(dataByKey);
  const newData = {
    [key]: dataByKey,
    ...data,
  };
  const newDataJson = JSON.stringify(newData, null, " ");
  writeFileSync(jsonDirectory + "/mockedDbData.json", newDataJson);
}
