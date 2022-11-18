import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import db from "../db.json";
import { UserData } from "../utils/types";

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || "super duper secret key";

export async function authenticateUser(
  req: IncomingMessage & { cookies: any }
): Promise<UserData | undefined> {
  const { users } = db;
  const { auth: token } = req.cookies;

  if (!token) return undefined;

  try {
    const data = jwt.verify(token, JWT_TOKEN_KEY);
    if (!data) return undefined;
    const user: UserData | undefined = users.find(
      (item) => item.email === (data as any).email
    );

    return user;
  } catch (error) {
    return undefined;
  }
}
