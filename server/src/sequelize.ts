import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// For now using a local SQLite DB for ease of development if Postgres is not provided
// Or expect POSTGRES_URI
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
    })
    : new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false,
    });

export default sequelize;
