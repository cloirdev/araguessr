import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the comarcas.json file
const filePath = join(__dirname, 'src', 'data', 'comarcas.json');
const data = JSON.parse(readFileSync(filePath, 'utf8'));

// Remove the 'bandera' property from each comarca
data.comarcas.forEach(comarca => {
  if (comarca.hasOwnProperty('bandera')) {
    delete comarca.bandera;
  }
});

// Write the updated data back to the file
writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log('Successfully removed all "bandera" properties from comarcas.json');
