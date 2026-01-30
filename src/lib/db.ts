import Database from 'better-sqlite3';
import path from 'path';

// Database file is in the parent directory
const dbPath = path.resolve(process.cwd(), '../churn.db');

let db: Database.Database;

try {
    db = new Database(dbPath, { readonly: false });
} catch (error) {
    console.error("Failed to connect to database:", error);
    throw error;
}

export default db;

