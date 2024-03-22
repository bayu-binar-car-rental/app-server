import database from "../config/database";
import { Model } from "objection";

Model.knex(database);

export interface IUser {
  id?: number;
  username?: string;
  email: string;
  password: string;
  role?: string;
}

export default class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumns() {
    return "id";
  }
}
