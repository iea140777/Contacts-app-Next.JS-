import { NextApiRequest, NextApiResponse } from "next";

import { DataByKey, DbData, UserContacts } from "../utils/types";
import { User, UserData } from "../utils/types";
import cookieOptions from "./cookieOptions";
import { getDbUsers } from "./dataHelpers/getDbUsers";
import { idGenerator } from "./dataHelpers/idGenerator";
import setCookie from "./dataHelpers/setCookie";
import { setToken } from "./dataHelpers/setToken";
import { updateDbData } from "./dataHelpers/updateDbData";

const users = getDbUsers();

export default function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body;
  const userId: number = idGenerator(users);
  const newUser: UserData = {
    id: userId,
    name,
    email,
    password,
  };

  const addUser = (data: DataByKey): void => {
    (data as DbData["users"]).push(newUser);
  };
  updateDbData(addUser, "users");

  const addnewUserContacts = (data: DataByKey): void => {
    const newUserContacts: UserContacts = {
      userId: userId,
      contacts: [],
    };
    (data as DbData["usersContacts"]).push(newUserContacts);
  };
  updateDbData(addnewUserContacts, "usersContacts");

  const token = setToken(email);

  setCookie(res, "auth", token, cookieOptions);

  const resUser: User = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };

  return res.status(200).json(resUser);
}
