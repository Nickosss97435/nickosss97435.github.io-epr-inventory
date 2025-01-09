import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './routes/auth.js';
import router from './routes/auth.js';
// import registerRoutes from './routes/register.js';
// import inventoryRoutes from './routes/inventory.js';
// import reportsRoutes from './routes/reports.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
// app.use('/api/register', registerRoutes);
// app.use('/api/inventory', inventoryRoutes);
// app.use('/api/reports', reportsRoutes);

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


app.listen(5001, () => {
  console.log('Serveur écoute sur http://localhost:5001');
});