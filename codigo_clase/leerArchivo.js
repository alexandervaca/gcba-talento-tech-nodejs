import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Obtener el directorio actual 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Ruta absoluta:', __dirname);

const filePath = path.join(__dirname, 'data', 'ejemplo.txt');

// Leemos el archivo ejemplo.txt
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }
  console.log('Contenido del archivo: ', data);
});
