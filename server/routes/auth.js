import express from 'express';
import bcrypt from 'bcrypt';
import { addUser, findUserByUsername } from '../models/user.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, teamNumber, scannerNumber } = req.body;

  try {
    const user = await addUser(username, password, teamNumber, scannerNumber);
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ message: 'Utilisateur créé avec succès', user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      message: 'Connexion réussie',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;