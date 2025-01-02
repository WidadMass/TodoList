import pool from '../../config/db';
import { Statut, StatutCreation } from './statutModel';

// Récupérer tous les statuts
export const getAllStatuts = async (): Promise<Statut[]> => {
  try {
    const query = 'SELECT id_statut, statuts_label, Description FROM Statuts';
    const [rows] = await pool.execute(query);
    return rows as Statut[];
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des statuts : ${error}`);
  }
};

// Récupérer un statut par ID
export const getStatutById = async (id: number): Promise<Statut | null> => {
  try {
    const query = 'SELECT id_statut, statuts_label, Description FROM Statuts WHERE id_statut = ?';
    const [rows] = await pool.execute(query, [id]);
    const statuts = rows as Statut[];
    return statuts[0] || null;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du statut avec l'ID ${id} : ${error}`);
  }
};

// Créer un statut
export const createStatut = async (statutData: StatutCreation): Promise<number> => {
  try {
    const { statuts_label, Description } = statutData;
    const query = 'INSERT INTO Statuts (statuts_label, Description) VALUES (?, ?)';
    const [result] = await pool.execute(query, [statuts_label, Description]);
    const insertResult = result as any;
    return insertResult.insertId;
  } catch (error) {
    throw new Error(`Erreur lors de la création du statut : ${error}`);
  }
};

// Mettre à jour un statut
export const updateStatut = async (id: number, statutData: Partial<Statut>): Promise<boolean> => {
  try {
    const { statuts_label, Description } = statutData;
    const query = 'UPDATE Statuts SET statuts_label = ?, Description = ? WHERE id_statut = ?';
    const [result] = await pool.execute(query, [statuts_label, Description, id]);
    return (result as any).affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du statut avec l'ID ${id} : ${error}`);
  }
};

// Supprimer un statut
export const deleteStatut = async (id: number): Promise<boolean> => {
  try {
    const query = 'DELETE FROM Statuts WHERE id_statut = ?';
    const [result] = await pool.execute(query, [id]);
    return (result as any).affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du statut avec l'ID ${id} : ${error}`);
  }
};