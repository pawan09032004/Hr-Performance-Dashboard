# PowerShell script to clean and build the project
Write-Host "🧹 Cleaning build cache..." -ForegroundColor Yellow

# Remove .next directory
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Removed .next directory" -ForegroundColor Green
}

# Remove node_modules/.cache if it exists
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "✅ Removed node_modules cache" -ForegroundColor Green
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "🏗️ Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Build successful! Ready for Vercel deployment." -ForegroundColor Green
    Write-Host "💡 You can now commit and push to deploy on Vercel." -ForegroundColor Cyan
} else {
    Write-Host "❌ Build failed. Check the errors above." -ForegroundColor Red
    exit 1
} 