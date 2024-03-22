import { Knex } from "knex";
import { encryptPassword } from "../utils/encryptions";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      username: "superadmin",
      email: "superadmin@bcr.com",
      password: encryptPassword("superadmin"),
      role: "superadmin",
    },
    {
      username: "bayu",
      email: "bayu@gmail.com",
      password: encryptPassword("bayu"),
      role: "member",
    },
  ]);
}
