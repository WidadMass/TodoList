import { RowDataPacket } from 'mysql2';
import pool from '../config/db'; // Assurez-vous d'importer correctement votre connexion MySQL

// Définir le type Priorite
interface Priorite {
  id_priority: number;
  priority_label: string;
  description: string;
}

// Récupérer toutes les priorités
export const getAllPriorites = async (): Promise<Priorite[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Priorities');
    return rows.length > 0 ? rows.map(row => row as Priorite) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des priorités:', error);
    throw new Error('Erreur lors de la récupération des priorités');
  }
};

// Récupérer une priorité par son ID
export const getPrioriteById = async (id: number): Promise<Priorite | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Priorities WHERE id_priority = ?', [id]);
    return rows.length > 0 ? (rows[0] as Priorite) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération de la priorité:', error);
    throw new Error('Erreur lors de la récupération de la priorité');
  }
};

// Créer une nouvelle priorité
export const createPriorite = async (data: { priority_label: string; description?: string }): Promise<void> => {
  try {
    const { priority_label, description } = data;
    await pool.query('INSERT INTO Priorities (priority_label, description) VALUES (?, ?)', [
      priority_label,
      description || null,
    ]);
  } catch (error) {
    console.error('Erreur lors de la création de la priorité:', error);
    throw new Error('Erreur lors de la création de la priorité');
  }
};

// Mettre à jour une priorité existante
export const updatePriorite = async (id: number, data: { priority_label: string; description?: string }): Promise<void> => {
  try {
    const { priority_label, description } = data;
    await pool.query(
      'UPDATE Priorities SET priority_label = ?, description = ? WHERE id_priority = ?',
      [priority_label, description || null, id]
    );
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la priorité:', error);
    throw new Error('Erreur lors de la mise à jour de la priorité');
  }
};

// Supprimer une priorité
export const deletePriorite = async (id: number): Promise<void> => {
  try {
    await pool.query('DELETE FROM Priorities WHERE id_priority = ?', [id]);
  } catch (error) {
    console.error('Erreur lors de la suppression de la priorité:', error);
    throw new Error('Erreur lors de la suppression de la priorité');
  }
};
