import { Router } from 'express';
import {
  createPrioriteHandler,
  getAllPrioritesHandler,
  getPrioriteByIdHandler,
  updatePrioriteHandler,
  deletePrioriteHandler
} from './prioriteController';

const router = Router();

router.post('/', createPrioriteHandler);         // Créer une priorité
router.get('/', getAllPrioritesHandler);         // Récupérer toutes les priorités
router.get('/:id', getPrioriteByIdHandler);      // Récupérer une priorité par ID
router.put('/:id', updatePrioriteHandler);       // Mettre à jour une priorité
router.delete('/:id', deletePrioriteHandler);    // Supprimer une priorité

export default router;