## STRUCTURE ET MISE EN PLACE ##
 _   _    _         _       
| \ | |  (_)       | | _    
|  \| |   _    __  | |/ /   ___  
| . ` |  | |  / _| |   /   / _ \ 
| |\  |  | | | (_  | | \  | |_| |
|_| \_|  |_|  \__| |_|\_\  \___/ 
_________________________________

# STRUCTURE

📁 inventory-app/
├── 📁 client/              # Frontend React + Vite
│   ├── 📁 public/  
│   │   └── logo.svg
│   ├── 📁 src/
│   │   ├── 📁 asetes/
│   │   │   ├── 📁 img/
│   │   │   ├── 📁 doc/
│   │   │   ├── 📁 font/
│   │   ├── 📁 components/
│   │   │   ├── Login.jsx
│   │   │   ├── ScannerSetup.jsx
│   │   │   ├── Inventory.jsx
│   │   │   └── Reports.jsx
│   │   ├── 📁 pages/
│   │   │   ├── Home.jsx 
│   │   │   ├── NotFound.jsx 
│   │   ├── 📁 stores/
│   │   │   └── themeStore.js
│   │   ├── App.jsx
│   │   │── main.jsx
│   │   └── tailwind.css
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── 📁 data/
│   ├── inventory.json
│   ├── scanners.json
│   ├── users.json
├── 📁 server/                 # Backend Node.js + Express
│   ├── 📁 controllers/
│   │   ├── inventoryController.js   // Logique métier pour l'inventaire
│   │   └── exportController.js      // Logique pour l'export
│   ├── 📁 routes/
│   │   ├── auth.js
│   │   ├── register.js
│   │   ├── reports.js
│   │   └── inventory.js             // Routes pour l'inventaire et l'export
│   ├── 📁 services/
│   │   └── exportService.js         // Service pour gérer l'export
│   ├── 📁 models/
│   │   ├── user.js
│   │   └── inventory.js             // Modèle de données
│   ├── 📁 utils/
│   │   └── excel.js                 // Utilitaires pour Excel
│   │── package.json
│   └── server.js                    // Point d'entrée
│── .env
│── hashPasswords.js
└── package.json              # Root package.json pour les scripts

## revoir la structure coté server
📁 server/
├── 📁 controllers/
│   ├── inventoryController.js   // Logique métier pour l'inventaire
│   └── exportController.js      // Logique pour l'export
├── 📁 routes/
│   ├── auth.js
│   ├── register.js
│   ├── reports.js
│   └── inventory.js             // Routes pour l'inventaire et l'export
├── 📁 services/
│   └── exportService.js         // Service pour gérer l'export
├── 📁 models/
│   ├── user.js
│   └── inventory.js             // Modèle de données
├── 📁 utils/
│   └── excel.js                 // Utilitaires pour Excel
│── package.json
└── server.js                    // Point d'entrée


# Coté client

npm create vite@latest client -- --template react
cd client

# Coté server
mkdir server
cd server

npm init --all

npm install express nodemon --save-dev
touch server.js

# dans server/server.js
import express from 'express';
import { createServer } from 'vite';
import path from 'path';

const app = express();
const __dirname = path.resolve();

// Créer une instance du serveur Vite en mode middleware
const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
});

// Utiliser les middlewares de Vite
app.use(vite.middlewares);

// Exemple de route API
app.get('/api/greeting', (req, res) => {
    res.json({ message: "Hello World!" });
});

// Démarrer le serveur sur le port 3001
app.listen(3001, () => {
    console.log('Serveur écoute sur http://localhost:5001');
});

## installer Vite JS
npm install vite --save-dev

# Ajouter à server/package.json *voir plus bas
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}


"proxy": "http://localhost:3001"

# Pour démarrer avec Nodemon
npm run dev  

-------------------------------------------------------------
# Démmarer le sever coté client et coté server en même temps
## Installer concurrently à la racine
npm install concurrently --save-dev

### VOILA A QUOID RESSEMBE MES FICHIERS package.json

#### package.json
{
  "name": "test",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "concurrently \"npm run dev --prefix client\" \"npm run dev --prefix server\"",
    "start": "node server/server.js"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "concurrently": "^9.1.2"
  }
}

#### server/package.json
{
  "name": "server",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "express": "^4.21.2",
    "nodemon": "^3.1.9",
    "vite": "^6.0.7"
  },
  "proxy": "http://localhost:3001"
}

#### client/package.json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "vite": "^6.0.7"
  }
}



## DEPANDENCES ##

npm i react-router-dom

npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Configurer tailwind.config.js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

# Créer un fichier tailwind.css
touch tailwind.css
/* src/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

# Importer le css dans main.js

import './tailwind.css';

# 

npm run hash-passwords
npm install express body-parser cors bcrypt jsonwebtoken
