import pool from '../../config/db';
import { Priorite, PrioriteCreation } from './prioriteModel';

// Récupérer toutes les priorités
export const getAllPriorites = async (): Promise<Priorite[]> => {
  try {
    const query = 'SELECT id_priority, priority_label, description FROM Priorities';
    const [rows] = await pool.execute(query);
    return rows as Priorite[];
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des priorités : ${error}`);
  }
};

// Récupérer une priorité par ID
export const getPrioriteById = async (id: number): Promise<Priorite | null> => {
  try {
    const query = 'SELECT id_priority, priority_label, description FROM Priorities WHERE id_priority = ?';
    const [rows] = await pool.execute(query, [id]);
    const priorites = rows as Priorite[];
    return priorites[0] || null;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de la priorité avec l'ID ${id} : ${error}`);
  }
};

// Créer une priorité
export const createPriorite = async (prioriteData: PrioriteCreation): Promise<number> => {
  try {
    const { priority_label, description } = prioriteData;
    const query = 'INSERT INTO Priorities (priority_label, description) VALUES (?, ?)';
    const [result] = await pool.execute(query, [priority_label, description]);
    const insertResult = result as any;
    return insertResult.insertId;
  } catch (error) {
    throw new Error(`Erreur lors de la création de la priorité : ${error}`);
  }
};

// Mettre à jour une priorité
export const updatePriorite = async (id: number, prioriteData: Partial<Priorite>): Promise<boolean> => {
  try {
    const { priority_label, description } = prioriteData;
    const query = 'UPDATE Priorities SET priority_label = ?, description = ? WHERE id_priority = ?';
    const [result] = await pool.execute(query, [priority_label, description, id]);
    return (result as any).affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de la priorité avec l'ID ${id} : ${error}`);
  }
};

// Supprimer une priorité
export const deletePriorite = async (id: number): Promise<boolean> => {
  try {
    const query = 'DELETE FROM Priorities WHERE id_priority = ?';
    const [result] = await pool.execute(query, [id]);
    return (result as any).affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de la priorité avec l'ID ${id} : ${error}`);
  }
};