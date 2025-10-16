import fetch from 'node-fetch';

fetch('https://rickandmortyapi.com/api/character')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    console.log('res: ', res.ok);
    return res.json();
  })
  .then(data => {
    const primerosCinco = data.results.slice(0, 5);
    console.log('Primeros 5 personajes:', primerosCinco);
  })
  .catch(err => {
    console.error('Error al obtener personajes:', err.message);
  })
  .finally(() => {
    console.log('Proceso finalizado');
  });
