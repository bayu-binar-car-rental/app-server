import path from "path";
import jwt from "jsonwebtoken";

import { IUser } from "../models/Users";
import RepoUsers from "../repositories/RepoUsers";
import { IRegister } from "../repositories/RepoUsers";
import { encryptPassword, comparePassword } from "../utils/encryptions";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface IParams {
  email: string;
  password: string;
}

class ServiceUsers {
  private _repoUsers: RepoUsers;

  constructor(repoUsers: RepoUsers) {
    this._repoUsers = repoUsers;
  }

  async list() {
    const users = await this._repoUsers.list();
    return users;
  }

  async login({ email, password }: IParams) {
    // Validate password
    if (password.length < 6) {
      return "Password's length must be more than 6 characters";
    }

    const user = (await this._repoUsers.findByEmail(email)) as unknown as IUser;
    if (!user) {
      console.log("Email not found");
      console.log(user);
      return user;
    }

    const validatePassword = comparePassword(password, user.password);
    if (!validatePassword) {
      return validatePassword;
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }

  async create(payload: IRegister) {
    const { username, email, password } = payload;

    // Check password
    if (password.length < 6) {
      return "Password length must be more than 6 characters";
    }

    // Check by username
    let user = await this._repoUsers.findByEmail(email);
    if (user) {
      return "Email already exists";
    }

    // Check by email
    user = await this._repoUsers.findByUsername(username);
    if (user) {
      return "Username already exists";
    }

    const encryptedPassword = encryptPassword(payload.password);
    const response = await this._repoUsers.create({
      ...payload,
      password: encryptedPassword,
      role: "member",
    });

    return response;
  }
}

export default ServiceUsers;
