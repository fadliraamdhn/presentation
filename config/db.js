import pkg from "pg";
import { config } from 'dotenv';
config();

const { Pool } = pkg;

export const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
});

