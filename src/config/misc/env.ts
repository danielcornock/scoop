import { config } from 'dotenv';

config({ path: 'config.env' });

export const databasePassword = process.env.DB_PASSWORD;
export const databaseUriString = process.env.DATABASE_URI;
export const localDatabaseUriString = process.env.LOCAL_DATABASE_URI;
export const devDatabaseUriString = process.env.DEV_DATABASE_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const isDevelopment = environment === 'dev';
export const isProduction = environment === 'production';

export const emailUsername = process.env.EMAIL_USERNAME;
export const emailPassword = process.env.EMAIL_PASSWORD;
export const emailPort = process.env.EMAIL_PORT;
export const emailHost = process.env.EMAIL_HOST;
