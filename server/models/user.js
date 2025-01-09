import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersFilePath = path.join(__dirname, '../../data/users.json');

export const readUsersFromFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
    return [];
  }
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

export const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const addUser = async (username, password, teamNumber, scannerNumber) => {
  const users = readUsersFromFile();
  
  if (users.find(user => user.username === username)) {
    throw new Error('Nom d\'utilisateur déjà pris');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    teamNumber,
    scannerNumber
  };
  
  users.push(newUser);
  writeUsersToFile(users);
  return newUser;
};

export const findUserByUsername = (username) => {
  const users = readUsersFromFile();
  return users.find(user => user.username === username);
};