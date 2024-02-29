import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      connectionString:
        "postgres://binar_car_rental_api_bayu:eOix6VWrSZXy0Sp@binar-car-rental-server-db-bayu.flycast:5432/binar_car_rental_api_bayu?sslmode=disable",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      connectionString:
        "postgres://binar_car_rental_api_bayu:eOix6VWrSZXy0Sp@binar-car-rental-server-db-bayu.flycast:5432/binar_car_rental_api_bayu?sslmode=disable",
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
