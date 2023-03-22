import { Contact, DbData } from "./types";

const mockedData: DbData = {
  users: [
    {
      id: "1",
      name: "Mary Doe",
      email: "1",
      password: "1",
    },
  ],
  usersContacts: [
    {
      userId: "1",
      contacts: [],
    },
  ],
  commonContacts: [
    {
      id: 1,
      name: "Fire",
      phone: "01",
      address: "",
      email: "",
    },
    {
      id: 2,
      name: "Police",
      phone: "02",
      address: "",
      email: "",
    },
    {
      id: 3,
      name: "Ambulance",
      phone: "03",
      address: "",
      email: "",
    },
    {
      id: 4,
      name: "Ambulance",
      phone: "03",
      address: "",
      email: "",
    },
  ],
};

enum ModalVariants {
  DELETE_CONTACT,
  SAVE_EMPTY_CONTACT,
}

const emptyContact: Contact = {
  id: 0,
  name: "",
  phone: "",
  address: "",
  email: "",
};

export { ModalVariants, emptyContact, mockedData };
