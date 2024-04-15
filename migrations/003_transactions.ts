import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.integer("idUser").notNullable();
    table.integer("idCar").notNullable();
    table.integer("totalPrice").notNullable();
    table.integer("withDriver").notNullable();
    table.string("rentDate", 255).notNullable();
    table.string("pickupTime", 255).notNullable();
    table.integer("totalPassenger");
    table.integer("paymentMethod").notNullable();
    table
      .enum("paymentStatus", ["ongoing", "failed", "rejected", "success"])
      .notNullable();
    table.timestamp("paymentDeadline").notNullable();
    table.timestamp("paymentProcessingDeadline");
    table.string("paymentProofImage", 255);
    table.string("paymentInvoiceImage", 255);
    table.timestamps(true, true);

    table.foreign("idUser").references("id").inTable("users");
    table.foreign("idCar").references("id").inTable("cars");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transactions");
}
