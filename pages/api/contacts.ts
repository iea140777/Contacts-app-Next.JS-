import { NextApiRequest, NextApiResponse } from "next";

import { userContacts } from "../../db.json";
import { authenticateUser } from "../../lib/authenticateUser";
import { ContactsList } from "../../utils/types";

function searchContacts(
  contacts: ContactsList,
  searchString: string
): ContactsList {
  const myRe = new RegExp(searchString, "gim");
  const result = contacts.filter((contact) => myRe.test(contact.name));
  console.log(myRe);
  return result;
}

export default async function getUserContacts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await authenticateUser(req);

  if (!user) {
    return res.status(401).send("");
  }

  switch (req.method) {
    case "GET":
      {
        // TODO: fix typing for searchString to comply with req.query typing
        const searchString = Object.values(req.query)[0] ?? "";
        const result = searchContacts(userContacts, searchString);
        // console.log(result);

        res.status(200).json(result);
      }

      break;
    case "POST":
      {
      }
      break;
    case "PUT":
      {
      }
      break;
    case "DELETE":
      {
      }
      break;
    default:
  }
}
