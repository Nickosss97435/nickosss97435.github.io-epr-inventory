import express from 'express';
import { readInventoryFromFile, writeInventoryToFile } from '../models/inventory.js';
import ExcelJS from 'exceljs';

const router = express.Router();

router.post('/', async (req, res) => {
    const { inventory } = req.body;
    console.log('Données reçues:', req.body);

    if (!inventory || !Array.isArray(inventory)) {
        return res.status(400).json({ 
            message: 'Le format des données est invalide. Un tableau d\'inventaire est requis.' 
        });
    }

    try {
        // Créer un workbook Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Inventaire');

        // Définir les colonnes
        worksheet.columns = [
            { header: 'Code Article', key: 'itemCode', width: 15 },
            { header: 'Quantité', key: 'quantity', width: 10 },
            { header: 'Scanner ID', key: 'scannerId', width: 15 },
            { header: 'Team ID', key: 'teamId', width: 10 },
            { header: 'Location', key: 'location', width: 15 },
            { header: 'Date', key: 'timestamp', width: 20 }
        ];

        // Ajouter les données
        worksheet.addRows(inventory);

        // Styliser l'en-tête
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };

        // Sauvegarder les données dans le fichier JSON
        const existingInventory = readInventoryFromFile();
        const updatedInventory = Array.isArray(existingInventory) 
            ? [...existingInventory, ...inventory]
            : inventory;
            
        if (!writeInventoryToFile(updatedInventory)) {
            throw new Error('Erreur lors de la sauvegarde des données');
        }

        // Générer le buffer Excel
        const buffer = await workbook.xlsx.writeBuffer();

        // Envoyer le fichier Excel
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=inventaire.xlsx');
        res.send(buffer);

    } catch (error) {
        console.error('Erreur traitement inventaire:', error);
        res.status(500).json({ 
            error: 'Erreur serveur lors du traitement de la requête',
            details: error.message 
        });
    }
});

export default router;