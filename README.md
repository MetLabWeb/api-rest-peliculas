# api-rest-peliculas

Ejercicio de API Rest
Encuentro MetLab Web 31/08/2024

## Setup y requisitos

### Node version 18.18.0

Configurar NVM para gestionar Node

- Tutorial para Mac
  https://eaglehead.medium.com/setting-up-node-js-on-macos-using-nvm-524b1554f240

- Tutorial para Windows
  https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows#install-nvm-windows-nodejs-and-npm

Asegurarse de tener nvm, npm y node
Ejecutar en la terminal

```
nvm --version
npm --version
node --version
```

## Como ejecutar la aplicación

1. Asegurarse tener la version correcta de node, ejecutando en la terminal
   ```
   nvm use
   ```
2. En el root del repositorio, instalar las dependencias necesarias ejecutando en la terminal
   ```
   npm install
   ```
3. Iniciar la aplicación ejecutando en la terminal

   ```
   npm run dev
   ```

4. Como probar la API

   Descargar [Postman](https://www.postman.com/downloads/) o la [Extension de Postman de VSCODE](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode) y hacer una petición a `http://localhost:8080/test`

### Recursos utiles

Express https://expressjs.com/

NodeJS https://nodejs.org/en

Typescript https://www.typescriptlang.org/
