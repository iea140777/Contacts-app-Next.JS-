import { NextApiRequest, NextApiResponse } from "next";

import authorizeUser from "../../lib/authorizeUser";
import cookieOptions from "../../lib/cookieOptions";
import setCookie from "../../lib/dataHelpers/setCookie";

export default function login(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return authorizeUser(req, res);
    case "DELETE":
      {
        setCookie(res, "auth", "0", {
          ...cookieOptions,
          path: "/",
          maxAge: 1,
        });
        res.send("");
      }
      break;
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
