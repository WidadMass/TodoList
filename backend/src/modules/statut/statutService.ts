import pool from '../../config/db';
import { Statut, StatutCreation } from './statutModel';

// Importation du type OkPacket depuis mysql2
import { OkPacket } from 'mysql2';

// Définir un type pour la réponse de création de statut
interface StatutResponse {
  id: number;
  statuts_label: string;
  description: string;
}

// Créer un nouveau statut
export const createStatut = async (statutsData: StatutCreation): Promise<StatutResponse> => {
  const { statuts_label, description } = statutsData;
  try {
    const [result] = await pool.query(
      'INSERT INTO statuts (statuts_label, description, created_at) VALUES (?, ?, ?)', 
      [statuts_label, description, new Date()]
    );
    
    // Vérification que result est un OkPacket et contient insertId
    if ('insertId' in result) {
      const insertId = result.insertId; // Si insertId existe, on l'utilise
      return { id: insertId, statuts_label, description };
    } else {
      throw new Error('insertId non trouvé dans la réponse de la requête');
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors de la création du statut: ${error.message}`);
    } else {
      throw new Error('Erreur inconnue lors de la création du statut');
    }
  }
};

// Récupérer tous les statuts
export const getAllStatuts = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM statuts');
    return rows; // rows est déjà un tableau d'objets
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors de la récupération des statuts: ${error.message}`);
    } else {
      throw new Error('Erreur inconnue lors de la récupération des statuts');
    }
  }
};

// Récupérer un statut par son ID
export const getStatutById = async (id: number) => {
  try {
    const [rows] = await pool.query('SELECT * FROM statuts WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0]; // Si 'rows' est un tableau et contient des données
    }
    return null;  // Statut non trouvé
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors de la récupération du statut: ${error.message}`);
    } else {
      throw new Error('Erreur inconnue lors de la récupération du statut');
    }
  }
};

// Mettre à jour un statut
export const updateStatut = async (id: number, statusData: StatutCreation) => {
  const { statuts_label, description } = statusData;
  try {
    const [result] = await pool.query(
      'UPDATE statuts SET statuts_label = ?, description = ?, updated_at = ? WHERE id = ?', 
      [statuts_label, description, new Date(), id]
    );
    
    // Assertion de type pour OkPacket
    const affectedRows = (result as OkPacket).affectedRows;
    return affectedRows > 0;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors de la mise à jour du statut: ${error.message}`);
    } else {
      throw new Error('Erreur inconnue lors de la mise à jour du statut');
    }
  }
};

// Supprimer un statut
export const deleteStatut = async (id: number) => {
  try {
    const [result] = await pool.query('DELETE FROM statuts WHERE id = ?', [id]);

    // Assertion de type pour OkPacket
    const affectedRows = (result as OkPacket).affectedRows;
    return affectedRows > 0;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors de la suppression du statut: ${error.message}`);
    } else {
      throw new Error('Erreur inconnue lors de la suppression du statut');
    }
  }
};