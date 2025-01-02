import { Router } from 'express';
import {
  createStatutHandler,
  getAllStatutsHandler,
  getStatutByIdHandler,
  updateStatutHandler,
  deleteStatutHandler
} from './statutController';

const router = Router();

// Routes pour les statuts
router.post('/', createStatutHandler);         // Créer un statut
router.get('/', getAllStatutsHandler);         // Récupérer tous les statuts
router.get('/:id', getStatutByIdHandler);     // Récupérer un statut par ID
router.put('/:id', updateStatutHandler);      // Mettre à jour un statut
router.delete('/:id', deleteStatutHandler);   // Supprimer un statut

export default router;