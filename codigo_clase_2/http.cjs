const http = require('http') // Usa el módulo nativo 'http'

const server = http.createServer((request, response) => {
  console.log('Método:', request.method)
  console.log('URL:', request.url)

  response.statusCode = 201 // Establece el código de estado correctamente
  response.setHeader('Content-Type', 'text/plain') // Opcional: define el tipo de contenido
  response.end('OK') // Finaliza la respuesta
})

const PORT = 3000

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
