
import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

if (!process.env.DB_URL) {
    throw new Error("DB_URL não foi configurada no .env");
}

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;
