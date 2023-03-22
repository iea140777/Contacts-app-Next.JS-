import { access, constants, readFileSync, writeFileSync } from "fs";

import { mockedData } from "../../utils/constants";
import { UsersDataList } from "../../utils/types";

export function getDbUsers(): UsersDataList {
  access("mockedDbData.json", constants.F_OK, (err) => {
    if (err) {
      console.log("no file");
      const newDataJson = JSON.stringify(mockedData, null, " ");
      writeFileSync("mockedDbData.json", newDataJson);
    }
  });
  const data = readFileSync("mockedDbData.json", "utf8");
  const { users } = JSON.parse(data);
  return users;
}
