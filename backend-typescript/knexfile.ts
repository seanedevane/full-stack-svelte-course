import { Knex } from 'knex';
import { config } from 'dotenv';
config({ path: './env/development.env'})


const configuration: Knex.Config = {
    client: 'pg',
    connection: {
      database: 'school_lunch',
      host: process.env.PG_CONNECTION_STRING || undefined,
      port: 5433,
      user: 'postgres',
      password: process.env.PG_PASSWORD || undefined,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations'
      },
}


export default configuration;