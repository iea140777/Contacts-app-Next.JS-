import { existsSync, readFileSync, writeFileSync } from "fs";

import { mockedData } from "../../utils/constants";
import { UsersDataList } from "../../utils/types";

export function getDbUsers(): UsersDataList {
  if (!existsSync("mockedDbData.json")) {
    const newDataJson = JSON.stringify(mockedData, null, " ");
    writeFileSync("mockedDbData.json", newDataJson);
  }

  const data = readFileSync("mockedDbData.json", "utf8");

  const { users } = JSON.parse(data);
  return users;
}
