import Users, { IUser } from "../models/Users";

export interface IRegister {
  username: string;
  email: string;
  password: string;
  role: string;
}

class RepoUsers {
  constructor() {}

  async list() {
    const users = Users.query();
    return await users;
  }

  async findByEmail(email: string) {
    const user = await Users.query().findOne("email", email);
    return user;
  }

  async findByUsername(username: string) {
    const user = await Users.query().findOne("username", username);
    return user;
  }

  async findById(id: number) {
    const user = await Users.query().findById(id);
    return user;
  }

  async create(payload: IRegister) {
    const response = await Users.query().insert(payload);
    return response;
    // const user = await Users.query()
    //   .where("email", "=", payload.email)
    //   .orWhere("username", "=", payload.username);

    // if (user.length > 0) {
    //   console.log("Email or username already exists");
    //   return false;
    // }
  }
}

export default RepoUsers;
