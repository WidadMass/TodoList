import { Router } from 'express';
import { registerUser, fetchAllUsers, fetchUserById, deleteUserById,updateUserById } from './userController';

const router = Router();

router.post('/register', registerUser);      // Créer un utilisateur
router.get('/', fetchAllUsers);              // Récupérer tous les utilisateurs
router.get('/:id', fetchUserById);           // Récupérer un utilisateur par ID
router.put('/:id', updateUserById);          // Mettre à jour un utilisateur 
router.delete('/:id', deleteUserById);       // Supprimer un utilisateur

export default router;
