import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This script populates local data files if needed
// For now, it's a placeholder that ensures the data directory exists

const dataDir = path.resolve(__dirname, '../src/data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Created data directory at', dataDir);
} else {
  console.log('Data directory already exists at', dataDir);
}

console.log('Local data population complete.');
