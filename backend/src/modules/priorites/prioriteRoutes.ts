import express from 'express';
import {
  createPrioriteHandler,
  getPriorites,
  getPriorite,
  updatePrioriteHandler,
  deletePrioriteHandler,
} from './prioriteController';

const router = express.Router();

// Définir la route POST pour créer une priorité
router.post('/', createPrioriteHandler);

// Autres routes (GET, PUT, DELETE)
router.get('/', getPriorites);
router.get('/:id', getPriorite);
router.put('/:id', updatePrioriteHandler);
router.delete('/:id', deletePrioriteHandler);

export default router;
