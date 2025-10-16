# Guía de Ejecución de Tests - FakeStore API CLI

## 🚀 Preparación para Ejecutar Tests

### 1. **Instalación de Dependencias**
```bash
# Navegar al directorio del proyecto
cd C:\dev\worksp-talentotech\2025-2C-nodejs\gcba-talento-tech-nodejs\techlab

# Instalar dependencias de testing
npm install
```

### 2. **Verificación de Configuración**
```bash
# Verificar que Jest esté instalado
npm list jest

# Verificar configuración de Jest en package.json
cat package.json | grep -A 5 "jest"
```

## 🧪 Ejecución de Tests

### **Comando Principal:**
```bash
npm test
```

### **Salida Esperada:**
```
 PASS  index.test.js
  FakeStore API CLI Tests
    getProducts
      ✓ should fetch all products successfully (5ms)
      ✓ should handle fetch error (2ms)
      ✓ should handle HTTP error response (1ms)
    getProductById
      ✓ should fetch product by ID successfully (3ms)
      ✓ should handle 404 error (2ms)
      ✓ should handle network error (1ms)
    createProduct
      ✓ should create product successfully (4ms)
      ✓ should handle creation error (2ms)
      ✓ should handle HTTP error response (1ms)
    deleteProduct
      ✓ should delete product successfully (3ms)
      ✓ should handle 404 error when deleting non-existent product (2ms)
      ✓ should handle network error (1ms)
    displayOutput
      ✓ should display array of products using console.table (1ms)
      ✓ should display empty array message (1ms)
      ✓ should display single object using JSON.stringify (1ms)
    showUsage
      ✓ should display usage instructions (1ms)
  Integration Tests
    Main function simulation
      ✓ should handle GET products command (3ms)
      ✓ should handle GET single product command (2ms)
      ✓ should handle POST product command (3ms)
      ✓ should handle DELETE product command (2ms)

Test Suites: 1 passed, 1 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        2.156 s
```

## 📊 Análisis de Resultados por Test

### **1. Tests de getProducts()**
```javascript
✅ should fetch all products successfully
   - Mock: fetch → respuesta 200 OK
   - Verifica: URL llamada, datos retornados, logs
   - Assertions: 4 verificaciones

❌ should handle fetch error  
   - Mock: fetch → error de red
   - Verifica: manejo de error, logs de error
   - Assertions: 2 verificaciones

❌ should handle HTTP error response
   - Mock: fetch → respuesta 500
   - Verifica: manejo de error HTTP, logs
   - Assertions: 2 verificaciones
```

### **2. Tests de getProductById(id)**
```javascript
✅ should fetch product by ID successfully
   - Mock: fetch → respuesta 200 con producto
   - Verifica: URL con ID, datos retornados, logs con ID
   - Assertions: 4 verificaciones

❌ should handle 404 error
   - Mock: fetch → respuesta 404
   - Verifica: manejo específico de 404, logs
   - Assertions: 2 verificaciones

❌ should handle network error
   - Mock: fetch → error de conexión
   - Verifica: manejo de error, logs
   - Assertions: 2 verificaciones
```

### **3. Tests de createProduct()**
```javascript
✅ should create product successfully
   - Mock: fetch → respuesta 201 Created
   - Verifica: método POST, headers, body JSON, logs
   - Assertions: 5 verificaciones

❌ should handle creation error
   - Mock: fetch → error de servidor
   - Verifica: manejo de error, logs con título
   - Assertions: 2 verificaciones

❌ should handle HTTP error response
   - Mock: fetch → respuesta 400
   - Verifica: manejo de error HTTP, logs
   - Assertions: 2 verificaciones
```

### **4. Tests de deleteProduct()**
```javascript
✅ should delete product successfully
   - Mock: fetch → respuesta 200 con producto eliminado
   - Verifica: método DELETE, URL con ID, logs
   - Assertions: 4 verificaciones

❌ should handle 404 error when deleting non-existent product
   - Mock: fetch → respuesta 404
   - Verifica: manejo específico de 404, logs
   - Assertions: 2 verificaciones

❌ should handle network error
   - Mock: fetch → error de conexión
   - Verifica: manejo de error, logs
   - Assertions: 2 verificaciones
```

### **5. Tests de displayOutput()**
```javascript
✅ should display array of products using console.table
   - Mock: array de productos
   - Verifica: uso de console.table, logs
   - Assertions: 3 verificaciones

✅ should display empty array message
   - Mock: array vacío
   - Verifica: mensaje "No products found", logs
   - Assertions: 3 verificaciones

✅ should display single object using JSON.stringify
   - Mock: objeto único
   - Verifica: uso de JSON.stringify, logs
   - Assertions: 3 verificaciones
```

### **6. Tests de showUsage()**
```javascript
✅ should display usage instructions
   - Verifica: contenido de ayuda, ejemplos, logs
   - Assertions: 7 verificaciones
```

### **7. Tests de Integración**
```javascript
✅ should handle GET products command
   - Mock: process.argv y fetch
   - Verifica: flujo completo GET products
   - Assertions: 2 verificaciones

✅ should handle GET single product command
   - Mock: process.argv y fetch
   - Verifica: flujo completo GET products/1
   - Assertions: 2 verificaciones

✅ should handle POST product command
   - Mock: process.argv y fetch
   - Verifica: flujo completo POST products
   - Assertions: 2 verificaciones

✅ should handle DELETE product command
   - Mock: process.argv y fetch
   - Verifica: flujo completo DELETE products/1
   - Assertions: 2 verificaciones
```

## 📈 Métricas de Cobertura

### **Total de Tests:** 20
### **Total de Assertions:** ~60
### **Funciones Cubiertas:** 6/6 (100%)
### **Casos de Éxito:** 16 tests
### **Casos de Error:** 12 tests
### **Tests de Integración:** 4 tests

## 🔍 Verificaciones Realizadas en Cada Test

### **Verificaciones de API:**
- ✅ URL correcta llamada
- ✅ Método HTTP correcto
- ✅ Headers correctos (Content-Type)
- ✅ Body JSON correcto
- ✅ Manejo de respuestas HTTP

### **Verificaciones de Logs:**
- ✅ Log de inicio de función
- ✅ Log de éxito/completado
- ✅ Log de error (cuando corresponde)
- ✅ Parámetros correctos en logs

### **Verificaciones de Datos:**
- ✅ Datos retornados correctos
- ✅ Estructura de objetos validada
- ✅ Manejo de arrays vs objetos únicos

## 🚨 Posibles Errores y Soluciones

### **Error: "Cannot find module '@jest/globals'"**
```bash
# Solución: Instalar Jest
npm install --save-dev jest @jest/globals
```

### **Error: "fetch is not defined"**
```bash
# Solución: Verificar que el mock esté configurado
# En index.test.js debe estar:
global.fetch = jest.fn();
```

### **Error: "Cannot resolve module './index.js'"**
```bash
# Solución: Verificar exports en index.js
# Debe contener:
export { getProducts, getProductById, ... };
```

### **Error: "Tests are running but failing"**
```bash
# Verificar mocks en beforeEach:
beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
});
```

## 🎯 Comandos de Testing Avanzados

### **Tests con Cobertura:**
```bash
npm run test:coverage
```

### **Tests en Modo Watch:**
```bash
npm run test:watch
```

### **Tests Específicos:**
```bash
# Solo tests de getProducts
npm test -- --testNamePattern="getProducts"

# Solo tests de error
npm test -- --testNamePattern="error"
```

### **Tests con Verbose Output:**
```bash
npm test -- --verbose
```

## ✅ Validación Final

Si todos los tests pasan, significa que:

1. **✅ Funciones exportadas correctamente**
2. **✅ Mocks configurados apropiadamente**
3. **✅ Casos de éxito funcionan**
4. **✅ Manejo de errores robusto**
5. **✅ Logs ejecutándose correctamente**
6. **✅ Integración end-to-end funcional**

**¡El proyecto está listo para producción! 🚀**
