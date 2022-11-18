import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

import { users } from "../db.json";
import { User, UserData } from "../utils/types";
import cookieOptions from "./cookieOptions";
import setCookie from "./setCookie";

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || "super duper secret key";
export default function authorizeUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const user: UserData | undefined = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) return res.status(401).send("");

  const token = jwt.sign({ email: user.email }, JWT_TOKEN_KEY, {
    expiresIn: "1d",
  });

  setCookie(res, "auth", token, cookieOptions);

  const resUser: User = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return res.status(200).json(resUser);
}
