import { Client } from 'pg'

export const handler = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })

  await client.connect()

  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL
    );
  `)

  await client.end()

  return { status: 'tables-created-updted' }
}

// await client.query(`
//     CREATE TABLE IF NOT EXISTS users (
//       id SERIAL PRIMARY KEY,
//       name TEXT NOT NULL,
//       email TEXT UNIQUE
//     );

//     CREATE TABLE IF NOT EXISTS tasks (
//       id SERIAL PRIMARY KEY,
//       title TEXT NOT NULL
//     );

//     ALTER TABLE users
//       ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

//     ALTER TABLE tasks
//       ADD COLUMN IF NOT EXISTS user_id INT;

//     ALTER TABLE tasks
//       ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

//     ALTER TABLE tasks
//       ADD CONSTRAINT IF NOT EXISTS tasks_user_fk
//       FOREIGN KEY (user_id)
//       REFERENCES users(id);
//   `)
