import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Agro_Tic_11',
  password: 'postgres',
  port: 5432,
});

export default pool;
