import { Router } from 'express';
import { 
  createStatut, 
  fetchAllStatuts, 
  fetchStatutById, 
  updateStatutById, 
  deleteStatutById 
} from './statutController';

const router = Router();

// Créer un statut
router.post('/', createStatut);

// Récupérer tous les statuts
router.get('/', fetchAllStatuts);

// Récupérer un statut par ID
router.get('/:id', fetchStatutById);

// Mettre à jour un statut par ID
router.put('/:id', updateStatutById);

// Supprimer un statut par ID
router.delete('/:id', deleteStatutById);

export default router;