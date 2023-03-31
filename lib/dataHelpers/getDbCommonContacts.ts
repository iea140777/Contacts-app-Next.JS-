import { readFileSync } from "fs";

import { ContactsList, DbData } from "../../utils/types";

export function getDbCommonContacts(): ContactsList {
  const data = readFileSync("mockedDbData.json", "utf8");
  const parsedData: DbData = JSON.parse(data);
  const { commonContacts } = parsedData;
  return commonContacts;
}
