console.log('argumentos , knexfile', process.argv);

let connection = {
  database: 'crud',
  user: 'postgres',
  password: 'crud2021',
  host: 'postgres-crud',
  port: '5432'
};

if (process.argv.find(element => element === 'dblocal')) {
  console.log('local achou');
  connection = {
    database: 'crud',
    user: 'postgres',
    password: 'crud2021',
    port: '5432'
  };
}

if (process.argv.find(element => element === 'dbdocker')) {
  console.log('local achou');
  connection = {
    database: 'crud',
    user: 'postgres',
    password: 'crud2021',
    port: '15432'
  };
}

console.log('conection',connection);

module.exports = {
  development: {
    client: 'postgresql',
    connection: connection
    ,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },

};