# FakeStore API CLI

Una aplicación de línea de comandos para gestionar productos usando la API de FakeStore.

## Características

- ✅ Consultar todos los productos
- ✅ Consultar un producto específico por ID
- ✅ Crear nuevos productos
- ✅ Eliminar productos existentes
- ✅ Logging detallado de todas las operaciones
- ✅ Manejo robusto de errores
- ✅ Tests unitarios completos

## Instalación

```bash
cd techlab
npm install
```

## Uso

### Consultar todos los productos
```bash
npm run start GET products
```

### Consultar un producto específico
```bash
npm run start GET products/15
```

### Crear un nuevo producto
```bash
npm run start POST products "T-Shirt-Rex" 300 "remeras"
```

### Eliminar un producto
```bash
npm run start DELETE products/7
```

## Testing

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch
```bash
npm run test:watch
```

### Ejecutar tests con cobertura
```bash
npm run test:coverage
```

## Estructura de Tests

Los tests cubren:

- **Tests unitarios** para cada función individual
- **Tests de integración** para flujos completos
- **Tests de manejo de errores** (404, network errors, etc.)
- **Tests de logging** para verificar que se ejecuten los logs correctos
- **Mocks** de fetch API y console para aislamiento

### Cobertura de Tests

- `getProducts()` - Tests para éxito, errores de red, errores HTTP
- `getProductById(id)` - Tests para producto encontrado, 404, errores de red
- `createProduct(title, price, category)` - Tests para creación exitosa, errores
- `deleteProduct(id)` - Tests para eliminación exitosa, 404, errores de red
- `displayOutput(data)` - Tests para arrays, objetos únicos, arrays vacíos
- `showUsage()` - Tests para verificar contenido de ayuda
- **Tests de integración** - Simulación de comandos completos

## Logging

La aplicación incluye logging detallado con emojis para mejor visualización:

- 🚀 Inicio de funciones
- ✅ Operaciones exitosas
- ❌ Errores
- 📋 Operaciones de lectura
- 🔍 Búsquedas específicas
- ➕ Creación de productos
- 🗑️ Eliminación de productos

## Tecnologías

- **Node.js** - Runtime
- **ES Modules** - Sistema de módulos
- **Fetch API** - Peticiones HTTP
- **Jest** - Framework de testing
- **FakeStore API** - API externa para productos

## Estructura del Proyecto

```
techlab/
├── package.json          # Configuración del proyecto
├── index.js             # Código principal
├── index.test.js        # Tests unitarios
└── README.md           # Documentación
```
