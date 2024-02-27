import { Knex } from "knex";
import fs from "fs";

const cars = JSON.parse(fs.readFileSync("./data/cars.json", "utf-8"));

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert(cars);
}
