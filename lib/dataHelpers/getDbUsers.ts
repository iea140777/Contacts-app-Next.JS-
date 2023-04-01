import { existsSync, readFile, readFileSync, writeFileSync } from "fs";
import path from "path";

import { mockedData } from "../../utils/constants";
import { UsersDataList } from "../../utils/types";

export function getDbUsers(): UsersDataList {
  // if (!existsSync("/mockedDbData.json")) {
  //   const newDataJson = JSON.stringify(mockedData, null, " ");
  //   writeFileSync("/tmp/mockedDbData.json", newDataJson);
  // }
  const jsonDirectory = path.join(process.cwd(), "json");
  const data = readFileSync(jsonDirectory + "/mockedDbData.json", "utf8");
  // const data = readFileSync("mockedDbData.json", "utf8");

  const { users } = JSON.parse(data);
  return users;
}
