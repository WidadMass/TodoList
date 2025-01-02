import { Request, Response } from 'express';
import { 
    createTodo, 
    getAllTodos, 
    getTodoById, 
    updateTodo, 
    deleteTodo,
    getTodosByUserId
} from './todoService';

// Créer une tâche
export const createTodoHandler = async (req: Request, res: Response) => {
  try {
    const todoId = await createTodo(req.body);
    res.status(201).json({
      message: 'Tâche créée avec succès',
      id: todoId
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Erreur lors de la création de la tâche',
      error: error.message
    });
  }
};

// Récupérer toutes les tâches
export const getAllTodosHandler = async (req: Request, res: Response) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des tâches',
      error: error.message
    });
  }
};

// Récupérer une tâche par ID
export const getTodoByIdHandler = async (req: Request, res: Response) => {
  try {
    const todo = await getTodoById(Number(req.params.id));
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Tâche non trouvée' });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Erreur lors de la récupération de la tâche',
      error: error.message
    });
  }
};

// Mettre à jour une tâche
export const updateTodoHandler = async (req: Request, res: Response) => {
  try {
    const updated = await updateTodo(Number(req.params.id), req.body);
    if (updated) {
      res.json({ message: 'Tâche mise à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Tâche non trouvée' });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la tâche',
      error: error.message
    });
  }
};

// Supprimer une tâche
export const deleteTodoHandler = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteTodo(Number(req.params.id));
    if (deleted) {
      res.json({ message: 'Tâche supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Tâche non trouvée' });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Erreur lors de la suppression de la tâche',
      error: error.message
    });
  }
};

// Récupérer les tâches d'un utilisateur
export const getTodosByUserIdHandler = async (req: Request, res: Response) => {
  try {
    const todos = await getTodosByUserId(Number(req.params.userId));
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des tâches de l\'utilisateur',
      error: error.message
    });
  }
};