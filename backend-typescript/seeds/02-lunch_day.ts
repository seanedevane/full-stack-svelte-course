import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("lunch_day").del();

    // Inserts seed entries
    await knex("lunch_day").insert([
        { lunch_week_id: 1, day: '2023-06-10', menu_details: 'text'},
        { lunch_week_id: 1, day: '2023-06-11', menu_details: 'text'},
        { lunch_week_id: 1, day: '2023-06-12', menu_details: 'text'},
        { lunch_week_id: 1, day: '2023-06-13', menu_details: 'text'},
        { lunch_week_id: 1, day: '2023-06-14', menu_details: 'text'},
    ]);
};
