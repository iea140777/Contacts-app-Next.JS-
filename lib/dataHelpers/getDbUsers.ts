import { readFileSync } from "fs";

import { UsersDataList } from "../../utils/types";

export function getDbUsers(): UsersDataList {
  const data = readFileSync("mockedDbData.json", "utf8");
  const { users } = JSON.parse(data);
  return users;
}
