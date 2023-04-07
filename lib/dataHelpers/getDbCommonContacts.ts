import { readFileSync } from "fs";
import path from "path";

import { ContactsList, DbData } from "../../utils/types";

export function getDbCommonContacts(): ContactsList {
  const jsonDirectory = path.join(process.cwd(), "/tmp");
  const data = readFileSync(jsonDirectory + "/mockedDbData.json", "utf8");
  const parsedData: DbData = JSON.parse(data);
  const { commonContacts } = parsedData;
  return commonContacts;
}
