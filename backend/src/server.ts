import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db'; // Import de la connexion MySQL
import userRoutes from './modules/user/userRoutes'; // Routes des utilisateurs
import statutRoutes from './modules/statuts/statutRoutes'; //Routes des statuts
import todoRoutes from './modules/todos/todoRoutes'; //Routes des todos
import prioriteRoutes from './modules/priorites/prioriteRoutes'; //Routes des priorités
import { setupGlobalMiddleware } from './middleware/global.middleware';
import { errorHandler, AppError } from './middleware/error.middleware';
import authMiddleware from './middleware/auth.middleware';

dotenv.config(); // Chargement des variables d'environnement

const app = express();
const PORT = process.env.PORT ?? 3000;

// Configuration des middleware globaux
setupGlobalMiddleware(app);

// Routes publiques (sans authentification)
app.use('/api/users/register', userRoutes);
app.use('/api/users/login', userRoutes);

// Middleware d'authentification pour toutes les autres routes /api/
app.use('/api', authMiddleware);

// Route de test pour vérifier la connexion à MySQL
app.get('/test-db', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({
      success: true,
      result: rows
    });
  } catch (error) {
    next(new AppError('Erreur de connexion à la base de données', 500));
  }
});

// Routes protégées (nécessitant une authentification)
app.use('/api/users', userRoutes);
app.use('/api/statuts', statutRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/priorites', prioriteRoutes);

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

export default app;