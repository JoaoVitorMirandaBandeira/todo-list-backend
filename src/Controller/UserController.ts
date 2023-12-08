import { Request, Response } from "express";
import InterfaceUserService from "../Interface/IntefaceUserService";
import { generateId } from "../utils/generateId";
import Cryptography from "../utils/Cryptography";
import User from "../Model/User";
import Authenticator from "../utils/Authenticator";

class UserController {
  constructor(
    private userService: InterfaceUserService,
    private cryptography: Cryptography,
    private authenticator: Authenticator
  ) {}
  createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, senha } = req.body;
    try {
      const userRegister = await this.userService.findByEmail(email);
      if (userRegister) {
        res.status(409).send("Email já cadastrado");
      }
      const id = generateId();
      const hash = await this.cryptography.hash(senha);
      const user = new User(id, name, email, hash);
      const idCreate = await this.userService.insertUser(user);
      const token = this.authenticator.generate(idCreate);
      res.status(201).json({ id: idCreate, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
