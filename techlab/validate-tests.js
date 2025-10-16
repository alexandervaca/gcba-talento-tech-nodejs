#!/usr/bin/env node

/**
 * Script de validación manual de tests
 * Verifica la estructura y contenido de los tests sin ejecutar Jest
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Validando estructura de tests...\n');

// Leer archivo de tests
const testFile = readFileSync(join(__dirname, 'index.test.js'), 'utf8');
const mainFile = readFileSync(join(__dirname, 'index.js'), 'utf8');

// Validaciones
const validations = {
    imports: false,
    mocks: false,
    describeBlocks: 0,
    testCases: 0,
    functionTests: {},
    exports: false
};

console.log('📋 Validaciones realizadas:\n');

// 1. Verificar imports de Jest
if (testFile.includes("import { jest } from '@jest/globals'")) {
    validations.imports = true;
    console.log('✅ Import de Jest encontrado');
} else {
    console.log('❌ Import de Jest no encontrado');
}

// 2. Verificar mocks
const mockChecks = [
    'global.fetch = jest.fn()',
    'console.log: jest.fn()',
    'console.error: jest.fn()',
    'console.table: jest.fn()'
];

mockChecks.forEach(check => {
    if (testFile.includes(check.replace(': jest.fn()', ': jest.fn()')) || testFile.includes(check)) {
        console.log(`✅ Mock encontrado: ${check}`);
    } else {
        console.log(`❌ Mock no encontrado: ${check}`);
    }
});

// 3. Contar describe blocks
const describeMatches = testFile.match(/describe\(/g);
if (describeMatches) {
    validations.describeBlocks = describeMatches.length;
    console.log(`✅ Describe blocks encontrados: ${validations.describeBlocks}`);
} else {
    console.log('❌ No se encontraron describe blocks');
}

// 4. Contar test cases
const testMatches = testFile.match(/test\(/g);
if (testMatches) {
    validations.testCases = testMatches.length;
    console.log(`✅ Test cases encontrados: ${validations.testCases}`);
} else {
    console.log('❌ No se encontraron test cases');
}

// 5. Verificar tests por función
const functions = ['getProducts', 'getProductById', 'createProduct', 'deleteProduct', 'displayOutput', 'showUsage'];

functions.forEach(func => {
    const funcTests = testFile.match(new RegExp(`describe\\('${func}'`, 'g'));
    if (funcTests) {
        validations.functionTests[func] = funcTests.length;
        console.log(`✅ Tests para ${func}: ${funcTests.length} describe block(s)`);
    } else {
        console.log(`❌ No se encontraron tests para ${func}`);
    }
});

// 6. Verificar exports en index.js
if (mainFile.includes('export {')) {
    validations.exports = true;
    console.log('✅ Exports encontrados en index.js');
} else {
    console.log('❌ No se encontraron exports en index.js');
}

// 7. Verificar funciones específicas en tests
const functionChecks = [
    'should fetch all products successfully',
    'should handle fetch error',
    'should fetch product by ID successfully',
    'should handle 404 error',
    'should create product successfully',
    'should delete product successfully',
    'should display array of products',
    'should display usage instructions'
];

console.log('\n🧪 Verificando tests específicos:');
functionChecks.forEach(check => {
    if (testFile.includes(check)) {
        console.log(`✅ Test encontrado: "${check}"`);
    } else {
        console.log(`❌ Test no encontrado: "${check}"`);
    }
});

// 8. Verificar beforeEach
if (testFile.includes('beforeEach(')) {
    console.log('✅ beforeEach encontrado para limpieza de mocks');
} else {
    console.log('❌ beforeEach no encontrado');
}

// 9. Verificar assertions
const assertionChecks = [
    'expect(fetch).toHaveBeenCalledWith',
    'expect(result).toEqual',
    'expect(console.log).toHaveBeenCalledWith',
    'expect(console.error).toHaveBeenCalledWith'
];

console.log('\n🎯 Verificando assertions:');
assertionChecks.forEach(check => {
    if (testFile.includes(check)) {
        console.log(`✅ Assertion encontrada: ${check}`);
    } else {
        console.log(`❌ Assertion no encontrada: ${check}`);
    }
});

// Resumen final
console.log('\n📊 RESUMEN DE VALIDACIÓN:');
console.log('=' .repeat(50));

const totalValidations = Object.keys(validations).length;
let passedValidations = 0;

if (validations.imports) passedValidations++;
if (validations.describeBlocks > 0) passedValidations++;
if (validations.testCases > 0) passedValidations++;
if (validations.exports) passedValidations++;

const functionTestsCount = Object.keys(validations.functionTests).length;
passedValidations += functionTestsCount;

console.log(`✅ Validaciones pasadas: ${passedValidations}/${totalValidations + functionTestsCount}`);
console.log(`📝 Describe blocks: ${validations.describeBlocks}`);
console.log(`🧪 Test cases: ${validations.testCases}`);
console.log(`🔧 Funciones testeadas: ${functionTestsCount}/6`);

if (passedValidations >= totalValidations + functionTestsCount - 2) {
    console.log('\n🎉 ¡VALIDACIÓN EXITOSA! Los tests están bien estructurados.');
    console.log('💡 Puedes ejecutar: npm test');
} else {
    console.log('\n⚠️  Algunas validaciones fallaron. Revisa los errores arriba.');
}

console.log('\n🚀 Para ejecutar los tests:');
console.log('   npm test');
console.log('   npm run test:watch');
console.log('   npm run test:coverage');
