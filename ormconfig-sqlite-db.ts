const dotenv = require('dotenv');
const entities = ['src/common/entities/sqlite-db/*.entity{.ts,.js}'];
const migrations = ['src/migrations/sqlite-db/*{.ts,.js}'];

const nodeEnv = process.env.NODE_ENV;
dotenv.config({
    path: `env/.${nodeEnv}.env`,
});

module.exports = {
    type: 'sqlite',
    driver: {
        type: 'sqlite',
        database: process.env.DB_DATABASE
    },
    database: process.env.DB_DATABASE,
    entities,
    migrations,
    cli: {
      entitiesDir: 'src/common/entities/sqlite-db',
      migrationsDir: 'src/migrations/sqlite-db'
    }
};

