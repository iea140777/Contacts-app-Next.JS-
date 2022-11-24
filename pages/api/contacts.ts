import { NextApiRequest, NextApiResponse } from "next";

import { authenticateUser } from "../../lib/authenticateUser";
import { getDbUserContacts } from "../../lib/dataHelpers/getDbUserContacts";
import { updateDbData } from "../../lib/dataHelpers/updateDbData";
import { Contact, ContactsList, DataByKey } from "../../utils/types";

function searchContacts(
  contactsList: ContactsList,
  searchValue: string | string[]
): ContactsList {
  const searchString = Array.isArray(searchValue)
    ? searchValue.join(" ")
    : searchValue;
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
        const userContacts: ContactsList | undefined = getDbUserContacts(
          user.id
        );
        if (!userContacts) {
          return res
            .status(500)
            .json("Error when getting contacts for the user");
        }
        const searchString = Object.values(req.query)[0] ?? "";
        const result = searchContacts(userContacts, searchString);

        res.status(200).json(result);
      }

      break;
    case "POST":
      {
        const newContact: Contact = req.body;
        const addContact = (data: DataByKey): void => {
          const userContacts = data.find((item) => item.userId === user.id);

          const newContactId: number =
            userContacts.contacts[userContacts.contacts.length - 1].id + 1;
          newContact.id = newContactId;

          data
            // TODO: fix typing for "item" in DataByKey interface
            .find((item) => item.userId === user.id)
            .contacts.push(newContact);
        };
        updateDbData(addContact, "usersContacts");
        res.status(200).json(newContact);
      }
      break;
    case "PUT":
      {
        const updatedContact: Contact = req.body;
        const updateContact = (data: DataByKey): void => {
          const userContacts = data.find((item) => item.userId === user.id);
          const updatedContactIndex = userContacts.contacts.findIndex(
            (contact) => contact.id === updatedContact.id
          );
          userContacts.contacts[updatedContactIndex] = updatedContact;
        };
        updateDbData(updateContact, "usersContacts");
        res.status(200).json(updatedContact);
      }
      break;
    case "DELETE":
      {
        const contactId = Number(req.body);

        const deleteContact = (data: DataByKey) => {
          const userContacts = data.find((item) => item.userId === user.id);
          const updatedContacts = userContacts.contacts.filter(
            (contact: Contact) => contact.id !== contactId
          );
          userContacts.contacts = updatedContacts;
        };
        updateDbData(deleteContact, "usersContacts");
        res.status(200).json(contactId);
      }
      break;
    default:
  }
}
