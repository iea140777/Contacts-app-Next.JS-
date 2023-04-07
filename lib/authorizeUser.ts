import { NextApiRequest, NextApiResponse } from "next";

import { User, UserData } from "../utils/types";
import cookieOptions from "./cookieOptions";
import { getDbUsers } from "./dataHelpers/getDbUsers";
import setCookie from "./dataHelpers/setCookie";
import { setToken } from "./dataHelpers/setToken";

const users = getDbUsers();

export default function authorizeUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const user: UserData | undefined = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) return res.status(401).send("");

  const token = setToken(user.email);

  setCookie(res, "auth", token, cookieOptions);

  const resUser: User = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return res.status(200).json(resUser);
}
