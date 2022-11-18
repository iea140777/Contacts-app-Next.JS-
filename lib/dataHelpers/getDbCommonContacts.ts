import { readFileSync } from "fs";

import { ContactsList } from "../../utils/types";

export function getDbCommonContacts(): ContactsList {
  const data = readFileSync("mockedDbData.json", "utf8");
  const { commonContacts } = JSON.parse(data);
  return commonContacts;
}
