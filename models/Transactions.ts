import database from "../config/database";
import { Model } from "objection";

Model.knex(database);

export interface ITransactions {
  id?: number;
  idUser?: number;
  idCar?: number;
  totalPrice?: number;
  withDriver?: number;
  rentDate?: string;
  pickupTime?: string;
  totalPassenger?: number;
  paymentMethod?: number;
  paymentStatus?: "ongoing" | "success" | "failed" | "rejected";
  paymentDeadline?: string;
  paymentProcessingDeadline?: string;
  created_at?: string;
  updated_at?: string;
}

export default class Transactions extends Model {
  static get tableName() {
    return "transactions";
  }

  static get idColumns() {
    return "id";
  }
}
