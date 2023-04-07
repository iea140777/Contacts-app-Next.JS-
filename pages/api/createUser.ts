import { NextApiRequest, NextApiResponse } from "next";

import createUser from "../../lib/createUser";

export default function login(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return createUser(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
