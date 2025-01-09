//server/models/inventory
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inventoryFilePath = path.join(__dirname, '../../data/scanners.json');

// Assure que le fichier existe
const ensureFileExists = () => {
    if (!fs.existsSync(inventoryFilePath)) {
        fs.writeFileSync(inventoryFilePath, JSON.stringify([], null, 2));
    }
};

const readInventoryFromFile = () => {
    ensureFileExists();
    try {
        const data = fs.readFileSync(inventoryFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lecture fichier:', error);
        return [];
    }
};

const writeInventoryToFile = (inventory) => {
    try {
        ensureFileExists();
        fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 2));
        return true;
    } catch (error) {
        console.error('Erreur écriture fichier:', error);
        return false;
    }
};

export { readInventoryFromFile, writeInventoryToFile };
