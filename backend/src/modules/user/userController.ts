import { Request, Response } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from './userService';

// Créer un utilisateur
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
  }
};

// Récupérer tous les utilisateurs
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
  }
};

// Récupérer un utilisateur par ID
export const fetchUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (user) res.json(user);
    else res.status(404).json({ message: 'Utilisateur non trouvé' });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: error.message });
  }
};

// Mettre à jour un utilisateur
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    if (user) res.json(user);
    else res.status(404).json({ message: 'Utilisateur non trouvé' });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error: error.message });
  }
};

// Supprimer un utilisateur
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const success = await deleteUser(Number(req.params.id));
    if (success) res.json({ message: 'Utilisateur supprimé avec succès' });
    else res.status(404).json({ message: 'Utilisateur non trouvé' });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
  }
};
