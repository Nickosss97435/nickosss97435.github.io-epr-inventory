// server/routes/scanner.js
import express from 'express';
const router = express.Router();

router.post('/setup', async (req, res) => {
  try {
    // Valider les informations du scanner
    const { scannerId, teamId, location } = req.body;
    // Ajouter la logique de validation ici
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;