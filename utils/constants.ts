import { Contact } from "./types";

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

enum SortingOrder {
  ASC,
  DESC,
}

export { ModalVariants, emptyContact, SortingOrder };
