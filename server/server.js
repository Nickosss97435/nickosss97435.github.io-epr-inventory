//server/server
import express from 'express';
import { createServer } from 'vite';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './routes/auth.js';
import router from './routes/auth.js';
import inventoryRoutes from './routes/inventory.js';
import scannerRoutes from './routes/scanner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.get("/api", (req, res) => {
    res.json({ test: [ "test-1", "test-2", "test-3", ] });
});

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/scanner', scannerRoutes);
app.get('/api/scanners', (req, res) => {
    const filePath = path.join(__dirname, '../data/scanners.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
        }
        res.json(JSON.parse(data));
    });
});

// Créer une instance du serveur Vite en mode middleware
const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
});
// Utiliser les middlewares de Vite
app.use(vite.middlewares);
// Test routes
app.get('/api/greeting', (req, res) => {
    res.json({ message: "ho top! ;-)" });
});
// Inscription d'un nouvel utilisateur
router.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });

      res.status(201).json({ message: 'Utilisateur créé avec succès', uid: userRecord.uid });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Report
app.get('/api/reports', (req, res) => {
    res.json({ message: "Report vide pour le moment" });
});
// Démarrer le serveur
app.listen(5001, () => {
    console.log('Serveur écoute sur http://localhost:5001');
});
