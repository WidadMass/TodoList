import pool from '../config/db';
import { Statut, StatutCreation } from './statutModel';

// Définir un type pour la réponse de création de statut
interface StatutResponse {
  id_statut: number;
  status_label: string;
  description: string;
}

// Créer un nouveau statut
export const createStatut = async (statusData: StatutCreation): Promise<StatutResponse> => {
  const { status_label, description } = statusData;
  try {
    // Exécuter la requête d'insertion
    const [result] = await pool.query(
      'INSERT INTO Statuts (status_label, description, created_at) VALUES (?, ?, ?)', 
      [status_label, description, new Date()]
    );

    // Le résultat de l'insertion peut être un objet contenant insertId si la requête réussit
    if ('insertId' in result) {
      const insertId = result.insertId;
      return { id_statut: insertId, status_label, description };
    }

    throw new Error('insertId n\'existe pas dans le résultat');
  } catch (error) {
    throw new Error(`Erreur lors de la création du statut: ${error.message}`);
  }
};

// Récupérer tous les statuts
export const getAllStatuts = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM Statuts');
    return rows;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des statuts: ${error.message}`);
  }
};

// Récupérer un statut par son ID
export const getStatutById = async (id: number) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Statuts WHERE id_statut = ?', [id]);
    if (rows.length > 0) {
      return rows[0];
    }
    return null;  // Statut non trouvé
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du statut: ${error.message}`);
  }
};

// Mettre à jour un statut
export const updateStatut = async (id: number, statusData: StatutCreation) => {
  const { status_label, description } = statusData;
  try {
    const [result] = await pool.query(
      'UPDATE Statuts SET status_label = ?, description = ?, updated_at = ? WHERE id_statut = ?', 
      [status_label, description, new Date(), id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du statut: ${error.message}`);
  }
};

// Supprimer un statut
export const deleteStatut = async (id: number) => {
  try {
    const [result] = await pool.query('DELETE FROM Statuts WHERE id_statut = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du statut: ${error.message}`);
  }
};
