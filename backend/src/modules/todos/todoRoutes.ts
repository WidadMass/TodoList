import { Router } from 'express';
import {
    createTodoHandler,
    getAllTodosHandler,
    getTodoByIdHandler,
    updateTodoHandler,
    deleteTodoHandler,
    getTodosByUserIdHandler
} from './todoController';

const router = Router();

router.post('/', createTodoHandler);           // Créer une tâche
router.get('/', getAllTodosHandler);           // Récupérer toutes les tâches
router.get('/:id', getTodoByIdHandler);        // Récupérer une tâche par ID
router.put('/:id', updateTodoHandler);         // Mettre à jour une tâche
router.delete('/:id', deleteTodoHandler);      // Supprimer une tâche
router.get('/user/:userId', getTodosByUserIdHandler);  // Récupérer les tâches d'un utilisateur

export default router;