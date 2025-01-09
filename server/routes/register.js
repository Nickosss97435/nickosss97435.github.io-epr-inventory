const express = require('express');
const router = express.Router();


// Ajouter un un utilisateur
router.post('/', async (req, res) => {
    const { location, itemCount, userId } = req.body;
  
    try {
      const newInventoryEntry = new Inventory({ location, itemCount, userId });
      await newInventoryEntry.save();
      
      res.status(201).json({ message: 'Entrée d\'un nouvelle utilisateur ajoutée avec succès' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });