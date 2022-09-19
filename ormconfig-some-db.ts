const dotenv = require('dotenv');
const entities = ['src/common/entities/some-db-name/*.entity{.ts,.js}'];
const migrations = ['src/migrations/some-db-name/*{.ts,.js}'];

const nodeEnv = process.env.NODE_ENV;
dotenv.config({
    path: `env/.${nodeEnv}.env`,
});

module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities,
    migrations,
    cli: {
      migrationsDir: 'src/migrations/some-db-name'
    }
};

