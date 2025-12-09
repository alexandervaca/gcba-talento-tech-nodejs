import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import dotenv from 'dotenv';
// Cargar variables de entorno
dotenv.config();

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Validar que todas las variables de entorno estén configuradas
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

//console.log('process.env.FIREBASE_API_KEY:',process.env.FIREBASE_API_KEY);


const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Variables de entorno de Firebase faltantes:', missingVars.join(', '));
  console.error('⚠️  Asegúrate de configurar todas las variables en el archivo .env');
}

// Inicializar Firebase
let app;
let db;

try {
  // Verificar que todas las configuraciones tengan valores válidos
  if (missingVars.length === 0 && Object.values(firebaseConfig).every(val => val && val !== 'your_firebase_api_key_here')) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('✅ Firebase inicializado correctamente');
    console.log(`📊 Proyecto: ${firebaseConfig.projectId}`);
  } else {
    console.warn('⚠️  Firebase no se inicializó. Verifica tu archivo .env');
    db = null;
  }
} catch (error) {
  console.error('❌ Error al inicializar Firebase:', error.message);
  console.error('💡 Verifica que las credenciales en .env sean correctas');
  db = null;
}

export { app, db };

