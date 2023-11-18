import { Knex } from "knex";

const tableName = 'lunch_day'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.increments('lunch_day_id') // primary key
        table.integer('lunch_week_id').notNullable() // foreign key
        table.date('day').notNullable()
        table.string('menu_details', 1000)
        table
            .foreign('lunch_week_id')
            .references('lunch_week_id')
            .inTable('lunch_week') // point to the lunch week table for the foreign key
            .onDelete('CASCADE') // when a lunch_week row with a matched foreign key is deleted, delete any matching child row

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableName)
}

