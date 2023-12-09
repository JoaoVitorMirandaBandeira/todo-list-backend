import InterfaceUserService from "../Interface/IntefaceUserService";
import User from "../Model/User";
import connection from "../configs/connection";

export default class UserService implements InterfaceUserService {
  findByEmail = async (email: string): Promise<User> => {
    try {
      const response = await connection("users")
        .select("*")
        .where("email", "=", email)
        .first();
      if (!response) return null;
      const user = new User(
        response.id,
        response.nome,
        response.email,
        response.senha
      );
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  insertUser = async (user: User): Promise<string> => {
    try {
      await connection("users").insert({
        id: user.id,
        nome: user.nome,
        email: user.email,
        senha: user.senha,
      });
      const userResponse = await connection("users")
        .where({ email: user.email })
        .select("id")
        .first();
      return userResponse.id as string;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
