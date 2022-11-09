type UserId = number | undefined;

interface UserData {
  id: UserId;
  name: string;
  email: string;
  password: string;
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
}

type ContactsList = Array<Contact>;

type UsersData = UserData[];

export type { ContactsList, UsersData, UserId, UserData, Contact };
