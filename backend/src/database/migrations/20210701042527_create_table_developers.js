exports.up = async knex => knex.schema.createTable('desenvolvedores', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('nome',255).notNullable();
    table.string('sexo',1).notNullable();
    table.integer('idade');
    table.string('hobby',255).notNullable();
    table.date('datanascimento').notNullable();
})

exports.down = async knex => knex.schema.dropTable('desenvolvedores')