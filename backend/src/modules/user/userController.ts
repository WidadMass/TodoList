import { Request, Response } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from './userService';

// Créer un utilisateur
export const registerUser = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
};

// Récupérer tous les utilisateurs
export const fetchAllUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

// Récupérer un utilisateur par ID
export const fetchUserById = async (req: Request, res: Response) => {
  const user = await getUserById(Number(req.params.id));
  if (user) res.json(user);
  else res.status(404).json({ message: 'Utilisateur non trouvé' });
};

// Mettre à jour un utilisateur
export const updateUserById = async (req: Request, res: Response) => {
  const user = await updateUser(Number(req.params.id), req.body);
  res.json(user);
};

// Supprimer un utilisateur
export const deleteUserById = async (req: Request, res: Response) => {
  const success = await deleteUser(Number(req.params.id));
  if (success) res.json({ message: 'Utilisateur supprimé avec succès' });
  else res.status(404).json({ message: 'Utilisateur non trouvé' });
};
