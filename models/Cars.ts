import database from "../config/database";
import { Model } from "objection";

Model.knex(database);

export interface ICars {
  id?: number;
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  availableAt: string;
  transmission: string;
  available: boolean;
  type: string;
  year: number;
  options: string[];
  specs: string[];
  created_at?: string;
  updated_at?: string;
}

export default class Cars extends Model {
  static get tableName() {
    return "cars";
  }

  static get idColumns() {
    return "id";
  }
}
