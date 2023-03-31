import { readFileSync } from "fs";

import { ContactsList, DbData, UserId } from "../../utils/types";

export function getDbUserContacts(id: UserId): ContactsList | undefined {
  const data = readFileSync("/mockedDbData.json", "utf8");
  const parsedData: DbData = JSON.parse(data);
  const { usersContacts } = parsedData;
  const contactsData = usersContacts.find((user) => user.userId === id);
  const contactsForId = contactsData ? contactsData.contacts : undefined;

  return contactsForId;
}
