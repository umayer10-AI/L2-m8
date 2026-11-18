import config from "../config";
import {Pool} from "pg"

export const pool = new Pool({
    connectionString: config.connecting_String
})

export const initDB = async() => {
    try {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS my(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(2500) NOT NULL,
            age INT,
            is_Active BOOLEAN DEFAULT true,
            created_At TIMESTAMP DEFAULT NOW(),
            updated_At TIMESTAMP DEFAULT NOW()
            );
            `)
        
        await pool.query(`
  CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES my(id) ON DELETE CASCADE,
    bio TEXT,
    address TEXT,
    phone VARCHAR(15),
    gender VARCHAR(15),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
`);

await pool.query(`
  ALTER TABLE profile
    ADD COLUMN IF NOT EXISTS bio TEXT,
    ADD COLUMN IF NOT EXISTS address TEXT,
    ADD COLUMN IF NOT EXISTS phone VARCHAR(15),
    ADD COLUMN IF NOT EXISTS gender VARCHAR(15)
`); 
    } catch (error) {
        console.log(error)
    }
}

// initDB()