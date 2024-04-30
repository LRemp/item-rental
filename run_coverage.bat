@echo off

IF EXIST "ItemRental.Tests\TestResults" (
    rmdir "ItemRental.Tests\TestResults" /s /q
)

rem Run tests with code coverage
dotnet test --collect:"XPlat Code Coverage"

rem Extract GUID from latest result folder (modify if folder structure differs)
for /f "tokens=*" %%a in ('dir /b /o-d /ad ItemRental.Tests\TestResults\') do set "guid=%%a"

if not defined guid (
  echo Error: Could not find a result folder in "ItemRental.Tests\TestResults".
  exit /b 1
)

rem Generate code coverage report using delayed expansion (recommended)
setlocal enabledelayexpansion

rem Report path using delayed expansion for flexibility
reportgenerator -reports:"ItemRental.Tests\TestResults\%guid%\coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html

echo Code coverage report generated in "coveragereport" folder.

start msedge.exe "%~dp0\coveragereport\index.html"
