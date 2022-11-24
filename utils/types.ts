// TODO: fix typeing for id
type UserId = number | undefined | string;

interface User {
  id: UserId;
  name: string;
  email: string;
}
interface UserData extends User {
  password: string;
}
type UsersDataList = Array<UserData>;

interface Contact {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
}

type ContactsList = Array<Contact>;

interface UserContacts {
  userId: UserId;
  contacts: ContactsList;
}

interface DbData {
  users: UsersDataList;
  commonContacts: ContactsList;
  usersContacts: UserContacts[];
}

// TODO: fix typing for DataByKey
type DataByKey = DbData[keyof DbData];

export type {
  ContactsList,
  User,
  UserId,
  UserData,
  Contact,
  DbData,
  UsersDataList,
  UserContacts,
  DataByKey,
};
