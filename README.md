# Playwright Core

## Installation
- npm install

## Browsers Install
- npx playwright install

## Run tests
- npx playwright test --project=<project name>

## To run your tests
# Powershell
` $Env:ENV='dev'; $Env:GEO='US'; npm run tests:uac`

# To run your tests in Debug mode in Powershell
` $Env:ENV='dev'; $Env:GEO='US';$Env:PWDEBUG='console'; $Env:DEBUG='pw:api'; npm run tests:uac`