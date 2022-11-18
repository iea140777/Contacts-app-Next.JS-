import { readFileSync } from "fs";

import { ContactsList } from "../../utils/types";

export function getDbUserContacts(): ContactsList {
  const data = readFileSync("mockedDbData.json", "utf8");
  const { userContacts } = JSON.parse(data);
  return userContacts;
}
