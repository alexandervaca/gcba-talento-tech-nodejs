import fetch from 'node-fetch';

async function obtenerPersonajes() {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character');
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    const primerosCinco = data.results.slice(0, 5);
    console.log('Primeros 5 personajes:', primerosCinco);
  } catch (err) {
    console.error('Error al obtener personajes:', err.message);
  } finally {
    console.log('Proceso finalizado');
  }
}

obtenerPersonajes();
