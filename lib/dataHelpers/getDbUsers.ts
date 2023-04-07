import { readFileSync } from "fs";
import path from "path";

import { UsersDataList } from "../../utils/types";

export function getDbUsers(): UsersDataList {
  const jsonDirectory = path.join(process.cwd(), "tmp");
  const data = readFileSync(jsonDirectory + "/mockedDbData.json", "utf8");

  const { users } = JSON.parse(data);
  return users;
}
