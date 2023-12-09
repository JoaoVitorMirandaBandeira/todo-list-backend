import { Request, Response } from "express";
import InterfaceUserService from "../Interface/IntefaceUserService";
import { generateId } from "../utils/generateId";
import Cryptography from "../utils/Cryptography";
import User from "../Model/User";
import Authenticator from "../utils/Authenticator";

export default class UserController {
  private userService: InterfaceUserService;
  private cryptography: Cryptography;
  private authenticator: Authenticator;
  constructor(useService: InterfaceUserService) {
    this.userService = useService;
    this.authenticator = new Authenticator();
    this.cryptography = new Cryptography();
  }
  createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, senha } = req.body;
    try {
      if (!email || !name || !senha) {
        res.status(422).send({ error: "Campos inválidos" });
      }
      console.log("teste1");
      const userRegister = await this.userService.findByEmail(email);
      console.log("teste2");
      if (userRegister) {
        res.status(409).send("Email já cadastrado");
        return;
      }
      console.log("teste");
      const id = generateId();
      console.log(id);
      const hash = await this.cryptography.hash(senha);
      const user = new User(id, name, email, hash);
      const idCreate = await this.userService.insertUser(user);
      const token = this.authenticator.generate(idCreate);
      res.status(201).send({ id: idCreate, token });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
}
