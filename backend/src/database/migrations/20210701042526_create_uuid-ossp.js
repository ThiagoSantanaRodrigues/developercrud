exports.up = async knex => knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

exports.down = async knex => knex.raw(`DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE ;`);