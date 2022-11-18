import { NextApiRequest, NextApiResponse } from "next";

import { authenticateUser } from "../../lib/authenticateUser";
import { getDbUserContacts } from "../../lib/dataHelpers/getDbUserContacts";
import { updateDbData } from "../../lib/dataHelpers/updateDbData";
import { Contact, ContactsList, DbData } from "../../utils/types";

function searchContacts(
  contactsList: ContactsList,
  searchString: string
): ContactsList {
  const myRe = new RegExp(searchString, "gim");
  const result = contactsList.filter((contact) => myRe.test(contact.name));
  return result;
}

export default async function contacts(
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
        const userContacts: ContactsList = getDbUserContacts();
        // TODO: fix typing for searchString to comply with req.query typing
        const searchString = Object.values(req.query)[0] ?? "";
        const result = searchContacts(userContacts, searchString);
        // console.log(result);

        res.status(200).json(result);
      }

      break;
    case "POST":
      {
        const newContact: Contact = req.body;
        const userContacts: ContactsList = getDbUserContacts();
        const newContactId: number =
          userContacts[userContacts.length - 1].id + 1;
        newContact.id = newContactId;
        const addContact = (data: DbData): void => {
          data.userContacts.push(newContact);
        };
        updateDbData(addContact);
        res.status(200).json(newContact);
      }
      break;
    case "PUT":
      {
        const updatedContact: Contact = req.body;

        const updateContact = (data: DbData): void => {
          const contactIndex = data.userContacts.findIndex(
            (contact) => contact.id === updatedContact.id
          );
          data.userContacts[contactIndex] = updatedContact;
        };
        updateDbData(updateContact);
        res.status(200).json(updatedContact);
      }
      break;
    case "DELETE":
      {
        const contactId = Number(req.body);

        const deleteContact = (data: DbData) => {
          const updatedContacts = data.userContacts.filter(
            (contact: Contact) => contact.id !== contactId
          );
          data.userContacts = updatedContacts;
        };
        updateDbData(deleteContact);
        res.status(200).json(contactId);
      }
      break;
    default:
  }
}
