const args = process.argv.slice(2);
// Ignoramos los dos primeros elementos con slice 
if (args[0] === 'saludar') {
  console.log(`¡Hola, ${args[1] || 'mundo'}!`);
} else if (args[0] === 'despedir') {
  console.log(`¡Adiós, ${args[1] || 'mundo'}!`);
} else {
  console.log('Comando no reconocido. Usa "saludar" o "despedir".');
}