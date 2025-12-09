# 🔥 Guía Rápida: Configuración de Firebase

## Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto" o "Add project"
3. Ingresa un nombre para tu proyecto (ej: `techlab-products`)
4. Acepta los términos y haz click en "Continuar"
5. Desactiva Google Analytics (opcional) y haz click en "Crear proyecto"
6. Espera a que se cree el proyecto y haz click en "Continuar"

## Paso 2: Registrar una Aplicación Web

1. En la página principal del proyecto, haz click en el ícono web `</>`
2. Ingresa un nombre para tu app (ej: `techlab-api`)
3. **NO** marques "También configurar Firebase Hosting"
4. Haz click en "Registrar app"
5. **Copia las credenciales** que aparecen en pantalla:

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBApb-lCmtK35_xEWW8yW0ic6xLZa-IopA",
  authDomain: "techlab-products.firebaseapp.com",
  projectId: "techlab-products",
  storageBucket: "techlab-products.firebasestorage.app",
  messagingSenderId: "914399802086",
  appId: "1:914399802086:web:61cc3a33bd5c8abdd54127"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

6. Haz click en "Continuar a la consola"

## Paso 3: Habilitar Firestore Database

1. En el menú lateral, selecciona "Firestore Database"
2. Haz click en "Crear base de datos"
3. Selecciona **"Iniciar en modo de prueba"** (para desarrollo)
4. Haz click en "Habilitar"

## Paso 4: Crear Colección de Productos

1. Una vez creada la base de datos, haz click en "Iniciar colección"
2. En "ID de colección" ingresa: `productos`
3. Haz click en "Siguiente"
4. Crea el primer documento con estos datos:

**Dejar que Firebase genere el ID automáticamente**

Campos:
- `title` (string): `"Laptop Dell XPS 13"`
- `price` (number): `1299.99`
- `description` (string): `"Laptop ultradelgada con procesador Intel Core i7"`
- `category` (string): `"electronics"`
- `image` (string): `"https://images.unsplash.com/photo-1593642632823-8f785ba67e45"`
- `rating` (map):
  - `rate` (number): `4.5`
  - `count` (number): `120`

5. Haz click en "Guardar"

## Paso 5: Configurar Variables de Entorno

1. En tu proyecto, abre el archivo `.env` (o copia `.env.example` a `.env`)
2. Pega las credenciales de Firebase:

```env
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=cambiar_por_algo_super_seguro_y_aleatorio
JWT_EXPIRES_IN=24h

# Firebase Configuration (pegar las credenciales de tu proyecto)
FIREBASE_API_KEY=AIzaSy...
FIREBASE_AUTH_DOMAIN=techlab-products.firebaseapp.com
FIREBASE_PROJECT_ID=techlab-products
FIREBASE_STORAGE_BUCKET=techlab-products.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abc123

# Credenciales de login
ADMIN_EMAIL=admin@techlab.com
ADMIN_PASSWORD=admin123
```

3. Guarda el archivo

## Paso 6: Instalar Dependencias y Ejecutar

```bash
cd techlab-2
npm install
npm start
```

## Paso 7: Probar la API

### 1. Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@techlab.com",
    "password": "admin123"
  }'
```

Copia el `token` de la respuesta.

### 2. Obtener Productos

```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

Deberías ver el producto que creaste en Firestore.

## ⚠️ Reglas de Seguridad de Firestore

**Para desarrollo** (permiten lectura/escritura sin autenticación):

1. Ve a Firestore Database → Reglas
2. Pega estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Publica las reglas

**⚠️ IMPORTANTE**: En producción, debes implementar reglas de seguridad más estrictas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      // Permitir lectura a todos
      allow read: if true;
      
      // Permitir escritura solo a usuarios autenticados
      allow write: if request.auth != null;
    }
  }
}
```

## 🎯 Verificación Final

Si todo está configurado correctamente:

- ✅ El servidor inicia sin errores
- ✅ Puedes hacer login y recibir un token
- ✅ Puedes obtener productos de Firestore
- ✅ Puedes crear nuevos productos
- ✅ Puedes eliminar productos

## 🔧 Solución de Problemas

### Error: Firebase not initialized

- Verifica que copiaste todas las credenciales correctamente
- Asegúrate de que no haya espacios al inicio o final de cada valor
- Verifica que el archivo `.env` esté en la raíz del proyecto

### Error: Missing or insufficient permissions

- Verifica las reglas de seguridad en Firestore
- Asegúrate de que permiten lectura/escritura

### Error: Cannot find module 'firebase'

- Ejecuta `npm install` en el directorio del proyecto

## 📚 Recursos Adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Documentación completa de la API

---

**✅ ¡Listo! Tu API está configurada y funcionando con Firebase.**

