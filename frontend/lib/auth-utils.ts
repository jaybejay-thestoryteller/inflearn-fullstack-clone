import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(password, hashedPassword);
};
