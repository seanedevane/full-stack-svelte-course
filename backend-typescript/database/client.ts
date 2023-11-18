import Knex from 'knex';
import configuration from '../knexfile';
// import knexStringCase from 'knex-stringcase';
const knexStringCase = require('knex-stringcase');

// grab the config file for the specific environment (we may not need to do this)
// const knex = Knex(configuration);
const options = knexStringCase(configuration)
const db = Knex(options)

export default db;