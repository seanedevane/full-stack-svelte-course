import { Knex } from 'knex';

const tableName = 'lunch_week'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.increments('lunch_week_id') // auto-incrementing primary key column
        table.date('week_of').notNullable()
        table.boolean('is_published').notNullable().defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableName)
}

