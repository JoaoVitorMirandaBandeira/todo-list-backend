import { Request, Response } from "express";
import Authenticator from "../utils/Authenticator";

export default class TodoController {
  private authenticator: Authenticator;

  constructor() {
    this.authenticator = new Authenticator();
  }

  create = async (req: Request, res: Response) => {
    const { titulo, descricao, userId } = req.body;
    try {
      if (!titulo || !descricao || !userId) {
        res.status(422).send({ error: "Campos inválidos" });
        return;
      }
    } catch (error) {}
  };
}
