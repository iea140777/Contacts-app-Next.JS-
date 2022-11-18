import { readFileSync, writeFileSync } from "fs";

import { DbData } from "../../utils/types";

type Handler = (data: DbData) => void;

export function updateDbData(handler: Handler) {
  const data: DbData = JSON.parse(readFileSync("mockedDbData.json", "utf8"));
  handler(data);

  const newData = JSON.stringify(data);
  writeFileSync("mockedDbData.json", newData);
}
