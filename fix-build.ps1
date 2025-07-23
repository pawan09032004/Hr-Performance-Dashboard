# PowerShell script to fix the build issue
Write-Host "🧹 Cleaning corrupted build files..." -ForegroundColor Yellow

# Stop any running processes
Write-Host "Stopping any running Next.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowTitle -like "*next*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Remove corrupted build directories
$directories = @(".next", "node_modules\.cache", ".next\cache")
foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Write-Host "Removing $dir..." -ForegroundColor Red
        Remove-Item -Recurse -Force $dir -ErrorAction SilentlyContinue
    }
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Verify package.json integrity
Write-Host "Verifying package.json..." -ForegroundColor Yellow
npm install --package-lock-only

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm ci

# Build the project
Write-Host "Building project..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful! The routes-manifest.json file should now exist." -ForegroundColor Green
    Write-Host "🚀 You can now run 'npm start' or deploy to Vercel." -ForegroundColor Cyan
} else {
    Write-Host "❌ Build failed. Check the errors above." -ForegroundColor Red
    Write-Host "💡 Try running the commands manually:" -ForegroundColor Yellow
    Write-Host "   1. Remove-Item -Recurse -Force .next" -ForegroundColor Gray
    Write-Host "   2. npm ci" -ForegroundColor Gray
    Write-Host "   3. npm run build" -ForegroundColor Gray
}

# Verify the routes-manifest.json exists
if (Test-Path ".next\routes-manifest.json") {
    Write-Host "✅ routes-manifest.json file created successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠️  routes-manifest.json still missing. Manual intervention needed." -ForegroundColor Yellow
} 