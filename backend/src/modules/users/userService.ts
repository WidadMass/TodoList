import { User } from './userModel';

let users: User[] = []; // Tableau en mémoire pour stocker les utilisateurs
let currentId = 1;      // Simuler l'auto-incrémentation des ID

// Créer un utilisateur
export const createUser = async (userData: Partial<User>): Promise<User> => {
  const newUser: User = {
    id: currentId++,
    name: userData.name || '',
    email: userData.email || '',
    password: userData.password || '',
    created_at: new Date(),
  };

  users.push(newUser);
  return newUser;
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (): Promise<User[]> => {
  return users;
};

// Récupérer un utilisateur par ID
export const getUserById = async (id: number): Promise<User | undefined> => {
  return users.find(user => user.id === id);
};

// Mettre à jour un utilisateur
export const updateUser = async (id: number, userData: Partial<User>): Promise<User | null> => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;

  users[userIndex] = { ...users[userIndex], ...userData, id };
  return users[userIndex];
};

export const deleteUser = async (id: number): Promise<boolean> => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
  
    users.splice(userIndex, 1); // Supprime l'utilisateur du tableau
    return true;
  };
  