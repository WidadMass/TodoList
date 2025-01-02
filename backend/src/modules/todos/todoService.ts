import pool from '../../config/db';
import { TodoCreation, TodoUpdate, TodoWithRelations } from './todoModel';

// Récupérer toutes les tâches avec leurs relations
export const getAllTodos = async (): Promise<TodoWithRelations[]> => {
  try {
    const query = `
      SELECT 
        t.*,
        u.First_name as user_name,
        p.priority_label,
        s.statuts_label as statut_label
      FROM todo t
      LEFT JOIN Users u ON t.id_user = u.id
      LEFT JOIN Priorities p ON t.id_priority = p.id
      LEFT JOIN Statuts s ON t.id_statut = s.id
      ORDER BY t.creation_date DESC
    `;
    const [rows] = await pool.execute(query);
    return rows as TodoWithRelations[];
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des tâches : ${error}`);
  }
};

// Récupérer une tâche par ID
export const getTodoById = async (id: number): Promise<TodoWithRelations | null> => {
  try {
    const query = `
      SELECT 
        t.*,
        u.First_name as user_name,
        p.priority_label,
        s.statuts_label as statut_label
      FROM todo t
      LEFT JOIN Users u ON t.id_user = u.id
      LEFT JOIN Priorities p ON t.id_priority = p.id
      LEFT JOIN Statuts s ON t.id_statut = s.id
      WHERE t.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    const todos = rows as TodoWithRelations[];
    return todos[0] || null;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de la tâche avec l'ID ${id} : ${error}`);
  }
};

// Créer une tâche
export const createTodo = async (todoData: TodoCreation): Promise<number> => {
  try {
console.log(todoData)

    const query = `
      INSERT INTO todo (
        title, description, creation_date, modification_date, due_date,
        modification_reason, id_user, id_priority, id_statut
      ) VALUES (?, ?, NOW(), NOW(), ?, ?, ?, ?, ?)
    `;
    const values = [
      todoData.title,
      todoData.description,
      todoData.due_date,
      todoData.modification_reason ?? null,
      todoData.id_user,
      todoData.id_priority,
      todoData.id_statut
    ];
    
    const [result] = await pool.execute(query, values);
    const insertResult = result as any;
    return insertResult.insertId;
  } catch (error) {
    throw new Error(`Erreur lors de la création de la tâche : ${error}`);
  }
};

// Mettre à jour une tâche
export const updateTodo = async (id: number, todoData: TodoUpdate): Promise<boolean> => {
  try {
    const query = `
      UPDATE todo 
      SET 
        title = ?,
        description = ?,
        modification_date = NOW(),
        due_date = ?,
        modification_reason = ?,
        id_priority = ?,
        id_statut = ?
      WHERE id = ?
    `;
    const values = [
      todoData.title,
      todoData.description,
      todoData.due_date,
      todoData.modification_reason ?? null,
      todoData.id_priority,
      todoData.id_statut,
      id
    ];
    
    const [result] = await pool.execute(query, values);
    return (result as any).affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de la tâche avec l'ID ${id} : ${error}`);
  }
};

// Supprimer une tâche
export const deleteTodo = async (id: number): Promise<boolean> => {
  try {
    const query = 'DELETE FROM todo WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return (result as any).affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de la tâche avec l'ID ${id} : ${error}`);
  }
};

// Récupérer les tâches d'un utilisateur spécifique
export const getTodosByUserId = async (userId: number): Promise<TodoWithRelations[]> => {
  try {
    const query = `
      SELECT 
        t.*,
        u.First_name as user_name,
        p.priority_label,
        s.statuts_label as statut_label
      FROM todo t
      LEFT JOIN Users u ON t.id_user = u.id
      LEFT JOIN Priorities p ON t.id_priority = p.id
      LEFT JOIN Statuts s ON t.id_statut = s.id
      WHERE t.id_user = ?
      ORDER BY t.creation_date DESC
    `;
    const [rows] = await pool.execute(query, [userId]);
    return rows as TodoWithRelations[];
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des tâches de l'utilisateur ${userId} : ${error}`);
  }
};