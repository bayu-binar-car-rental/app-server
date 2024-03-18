import type { Knex } from "knex";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL as string,
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL as string,
    },
  },
};

module.exports = config;
