@echo off
title Mohamed Hany Portfolio - Local Development Server
echo ===================================================
echo   Starting Mohamed Hany Portfolio Local Server...
echo ===================================================
echo.
echo Opening portfolio in your default browser...
start http://localhost:3000

echo.
echo Starting static server on http://localhost:3000
echo (Press Ctrl+C to stop the server)
echo.

npx --yes serve -l 3000 .
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Node.js/npx not found, trying Python server...
    python -m http.server 3000
)
pause
