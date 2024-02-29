import knex, { Knex } from "knex";

class Database {
  private static instance: Database;
  private _db: Knex;

  constructor() {
    this._db = knex({
      client: "postgresql",
      // connection: {
      //   database: "chapter_6",
      //   user: "tama",
      //   password: "ironman",
      // },
      connection: {
        connectionString:
          "postgres://binar_car_rental_api_bayu:eOix6VWrSZXy0Sp@binar-car-rental-server-db-bayu.flycast:5432/binar_car_rental_api_bayu?sslmode=disable",
      },
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  get db(): Knex {
    return this._db;
  }
}

export default Database.getInstance().db;
