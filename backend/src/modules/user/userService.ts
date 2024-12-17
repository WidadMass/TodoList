import pool from '../../config/db';
import { User } from './userModel';

// Récupérer tous les utilisateurs
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const query = 'SELECT id_user AS id, First_name AS name, email, created_at FROM Users';
    const [rows] = await pool.execute(query);
    return rows as User[];
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des utilisateurs : ${error}`);
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const query = 'SELECT id_user AS id, First_name AS name, email, created_at FROM Users WHERE id_user = ?';
    const [rows] = await pool.execute(query, [id]);
    const users = rows as User[];
    return users[0] || null;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${id} : ${error}`);
  }
};

// Créer un utilisateur
export const createUser = async (userData: Partial<User>): Promise<number> => {
  try {
    const { First_name, email, password } = userData;
    const query = 'INSERT INTO Users (First_name, email, password, created_at) VALUES (?, ?, ?, NOW())';
    const [result] = await pool.execute(query, [First_name, email, password]);
    const insertResult = result as any;
    return insertResult.insertId; // Retourner l'ID de l'utilisateur créé
  } catch (error) {
    throw new Error(`Erreur lors de la création de l'utilisateur : ${error}`);
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (id: number, userData: Partial<User>): Promise<boolean> => {
  try {
    const { First_name, email, password } = userData;
    const query = 'UPDATE Users SET First_name = ?, email = ?, password = ? WHERE id_user = ?';
    const [result] = await pool.execute(query, [First_name, email, password, id]);
    return (result as any).affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de l'utilisateur avec l'ID ${id} : ${error}`);
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const query = 'DELETE FROM Users WHERE id_user = ?';
    const [result] = await pool.execute(query, [id]);
    return (result as any).affectedRows > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id} : ${error}`);
  }
};
