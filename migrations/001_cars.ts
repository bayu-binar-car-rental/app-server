import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("plate", 255).notNullable();
    table.string("manufacture", 255).notNullable();
    table.string("model", 255).notNullable();
    table.string("image", 255).notNullable();
    table.integer("rentPerDay").notNullable();
    table.integer("capacity").notNullable();
    table.string("description", 255).notNullable();
    table.timestamp("availableAt").notNullable();
    table.string("transmission", 255).notNullable();
    table.boolean("available").notNullable();
    table.string("type", 255).notNullable();
    table.integer("year").notNullable();
    table.specificType("options", "text[]").notNullable();
    table.specificType("specs", "text[]").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
