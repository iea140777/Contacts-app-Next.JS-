import jwt from "jsonwebtoken";

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || "super duper secret key";

const setToken = (data: string): string => {
  const token = jwt.sign({ email: data }, JWT_TOKEN_KEY, {
    expiresIn: "1d",
  });
  return token;
};

export { setToken };
