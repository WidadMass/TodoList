import pool from '../../config/db';
import { User } from './userModel';

// Créer un utilisateur
export const createUser = async (userData: Partial<User>): Promise<any> => {
  const { name, email, password } = userData;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const [result] = await pool.execute(query, [name, email, password]);
  return result;
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (): Promise<User[]> => {
  const query = 'SELECT id, name, email, created_at FROM users';
  const [rows] = await pool.execute(query);
  return rows as User[];
};

// Récupérer un utilisateur par ID
export const getUserById = async (id: number): Promise<User | null> => {
  const query = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
  const [rows] = await pool.execute(query, [id]);
  const users = rows as User[];
  return users[0] || null;
};

// Mettre à jour un utilisateur
export const updateUser = async (id: number, userData: Partial<User>): Promise<any> => {
  const { name, email, password } = userData;
  const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
  const [result] = await pool.execute(query, [name, email, password, id]);
  return result;
};

// Supprimer un utilisateur
export const deleteUser = async (id: number): Promise<boolean> => {
  const query = 'DELETE FROM users WHERE id = ?';
  const [result] = await pool.execute(query, [id]);
  return (result as any).affectedRows > 0;
};
