import fetch from 'node-fetch';

const [, , method, endpoint] = process.argv;

if (!method || !endpoint) {
  console.error('Uso: npm run start <METHOD> <endpoint>. Ejemplo: DELETE products/7');
  process.exit(1);
}

const [resource, id] = endpoint.split('/');

const baseUrl = 'https://fakestoreapi.com';

async function ejecutar() {
  try {
    const url = `${baseUrl}/${resource}${id ? `/${id}` : ''}`;

    let response;
    switch (method.toUpperCase()) {
      case 'GET':
        response = await fetch(url);
        break;
      case 'POST':
        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ title: 'Nuevo producto', price: 99.99 }),
          headers: { 'Content-Type': 'application/json' }
        });
        break;
      case 'PUT':
        response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({ title: 'Producto actualizado' }),
          headers: { 'Content-Type': 'application/json' }
        });
        break;
      case 'DELETE':
        response = await fetch(url, { method: 'DELETE' });
        break;
      default:
        console.error('Método no soportado. Usa GET, POST, PUT o DELETE.');
        process.exit(1);
    }

    const data = await response.json();
    console.log(`✅ Respuesta (${method} ${endpoint}):`, data);
  } catch (err) {
    console.error('❌ Error al interactuar con la API:', err.message);
  }
}

ejecutar();
