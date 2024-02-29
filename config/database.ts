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
        connectionString: process.env.DATABASE_URL,
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
