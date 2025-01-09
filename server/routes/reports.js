const express = require('express');
const router = express.Router();

// Obtenir toutes les entrées d'inventaire pour un utilisateur spécifique
router.get('/:userId', async (req, res) => {
    try {
      const inventories = await Inventory.find({ userId: req.params.userId });
      
      res.status(200).json(inventories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Exporter les données d'inventaire au format XLSX (exemple simplifié)
  router.get('/export/:userId', async (req, res) => {
    const { writeFile, utils } = require('xlsx');
    
    try {
      const inventories = await Inventory.find({ userId: req.params.userId }).lean();
      
      const worksheet = utils.json_to_sheet(inventories);
      const workbook = utils.book_new();
      
      utils.book_append_sheet(workbook, worksheet, 'Inventaire');
      
      const filePath = `${__dirname}/inventaire_${req.params.userId}.xlsx`;
      
      writeFile(workbook, filePath);
      
      res.download(filePath); // Télécharge le fichier généré
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;