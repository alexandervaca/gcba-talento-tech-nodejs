# Script para ejecutar tests del proyecto FakeStore API CLI

Write-Host "🚀 Iniciando ejecución de tests..." -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Cyan

# Verificar si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error instalando dependencias" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
}

Write-Host "🧪 Ejecutando tests unitarios..." -ForegroundColor Blue
Write-Host "=" * 50 -ForegroundColor Cyan

# Ejecutar tests
npm test

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Todos los tests pasaron correctamente!" -ForegroundColor Green
} else {
    Write-Host "❌ Algunos tests fallaron" -ForegroundColor Red
}

Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host "🏁 Ejecución de tests completada" -ForegroundColor Green
