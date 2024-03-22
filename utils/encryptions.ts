import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export function encryptPassword(password: string) {
  const SALT = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(password, SALT);
}

export function comparePassword(inputPassword: string, userPassword: string) {
  const validatePassword = bcrypt.compareSync(inputPassword, userPassword);
  if (!validatePassword) return false;
  return true;
}

export function authorizeJwt(token: string) {
  try {
    const validateToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    return validateToken;
  } catch (e) {
    return e;
  }
}
