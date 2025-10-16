// script.js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .command('GET', 'Obtiene un dato')
  .command('POST <data>', 'Envía un dato', yargs => {
    yargs.positional('data', {
      describe: 'Dato a recibir',
      type: 'string'
    });
  })
  .command('PUT <id>', 'Modifica un item por ID', yargs => {
    yargs.positional('id', {
      describe: 'ID del item',
      type: 'number'
    });
  })
  .command('DELETE <id>', 'Elimina un item por ID', yargs => {
    yargs.positional('id', {
      describe: 'ID del item',
      type: 'number'
    });
  })
  .demandCommand(1, 'Debes ingresar un comando válido')
  .strict()
  .help()
  .argv;

const [command] = argv._;

switch (command) {
  case 'GET':
    console.log('1. Toma un dato');
    break;
  case 'POST':
    console.log(`Recibimos "${argv.data}" satisfactoriamente`);
    break;
  case 'PUT':
    console.log(`Modificamos el item con id: ${argv.id} satisfactoriamente`);
    break;
  case 'DELETE':
    console.log(`El item con el id: ${argv.id} se eliminó con éxito`);
    break;
}
