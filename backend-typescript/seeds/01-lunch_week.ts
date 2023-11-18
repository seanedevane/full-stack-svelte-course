import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("lunch_week").del();

    // Inserts seed entries
    await knex("lunch_week").insert([
        { week_of: "2023-06-10", is_published: false },
        { week_of: "2023-06-17", is_published: false },
        { week_of: "2023-06-23", is_published: false }
    ]);
};
