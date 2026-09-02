import fs from 'node:fs';
import path from 'node:path';

import { pool } from './pool';

async function migrate() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf-8');

  await pool.query(sql);
  console.log('✅ Database migration completed.');
}

migrate()
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
