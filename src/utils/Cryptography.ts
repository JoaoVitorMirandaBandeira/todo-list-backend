import bcrypt from "bcryptjs";

export default class Cryptography {
  hash = async (senha: string): Promise<string> => {
    const rounds = Number(12);
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(senha, salt);
  };

  compare = async (senha: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(senha, hash);
  };
}
