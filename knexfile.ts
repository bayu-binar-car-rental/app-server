import type { Knex } from "knex";

import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      // connectionString: "postgres://tama:ironman@localhost/chapter_6",
      connectionString: process.env.DATABASE_URL,
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
  },
  // development: {
  //   client: "postgresql",
  //   connection: {
  //     database: "chapter_6",
  //     user: "tama",
  //     password: "ironman",
  //   },
  // },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
};

module.exports = config;
