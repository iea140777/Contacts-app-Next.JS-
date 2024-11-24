import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import { User, UserData } from "../utils/types";
import { getDbUsers } from "./dataHelpers/getDbUsers";

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || "super duper secret key";

const users = getDbUsers();

export async function authenticateUser(
  req: IncomingMessage & { cookies: any }
): Promise<Pick<User, "name"> | undefined> {
  const { auth: token } = req.cookies;

  if (!token) return undefined;

  try {
    const jwtData = jwt.verify(token, JWT_TOKEN_KEY);
    if (!jwtData) return undefined;
    const user: UserData | undefined = users.find(
      (item) => item.email === (jwtData as any).email
    );
    return user;
    // const authenticateResult: Pick<User, "name"> | undefined = user
    //   ? { name: user.name }
    //   : undefined;
    // return authenticateResult;
  } catch (error) {
    return undefined;
  }
}
