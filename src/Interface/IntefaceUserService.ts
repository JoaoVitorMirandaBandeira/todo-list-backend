import User from "../Model/User";

export default interface InterfaceUserService {
  findByEmail(email: string): Promise<User | null>;
  insertUser(user: User): Promise<string>;
}
