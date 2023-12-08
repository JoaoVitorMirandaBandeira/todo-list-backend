import * as jwt from "jsonwebtoken";

const key = "123123";

export default class Authenticator {
  generate = (payload: string): string => {
    return jwt.sign({ payload }, key, { expiresIn: "59min" });
  };

  verify = (token: string): string => {
    try {
      const decoded = jwt.verify(token, key);
      return decoded as string;
    } catch (error) {
      throw new Error("Token invalido ou expirado");
    }
  };
}
