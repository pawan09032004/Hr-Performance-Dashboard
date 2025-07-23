# Clean and build script for Windows PowerShell
Write-Host "Cleaning .next directory..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host ".next directory removed" -ForegroundColor Green
}

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful! Ready for deployment." -ForegroundColor Green
} else {
    Write-Host "Build failed. Check errors above." -ForegroundColor Red
} 