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
        return;
      }

      const userRegister = await this.userService.findByEmail(email);

      if (userRegister) {
        res.status(409).send("Email já cadastrado");
        return;
      }

      const id = generateId();
      const hash = await this.cryptography.hash(senha);
      const user = new User(id, name, email, hash);
      const idCreate = await this.userService.insertUser(user);
      const token = this.authenticator.generate(idCreate);

      res.status(201).send({ id: idCreate, token });
      return;
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;

    try {
      if (!email || !senha) {
        res.status(422).send({ error: "Campos inválidos" });
        return;
      }

      const userRegister = await this.userService.findByEmail(email);

      if (!userRegister) {
        res.status(404).send("Usuario não encontrado");
        return;
      }

      const match = await this.cryptography.compare(senha, userRegister.senha);

      if (!match) {
        res.status(403).send("Senha incorreta");
        return;
      }

      const token = this.authenticator.generate(userRegister.id);

      res.status(200).send({ token });
      return;
    } catch (error) {
      res.status(500).send("Server Error");
      return;
    }
  };
}
