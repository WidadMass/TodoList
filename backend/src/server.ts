import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db'; // Import de la connexion MySQL
import userRoutes from './modules/user/userRoutes'; // Routes des utilisateurs
import statutRoutes from './statut/statutRoutes'; // Routes des statuts
import prioriteRoutes from './priorites/prioriteRoutes'; // Routes des priorités

dotenv.config(); // Chargement des variables d'environnement

const app = express();
const PORT = process.env.PORT || 3000; // Utilisation du port depuis les variables d'environnement ou 3000 par défaut

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour parser les requêtes x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Route de test pour vérifier la connexion à MySQL
app.get('/test-db', async (req, res) => {
  try {
    // Effectue une requête simple pour tester la connexion à la base de données
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.send(`Connexion MySQL réussie ! Résultat : ${JSON.stringify(rows)}`);
  } catch (error) {
    console.error('Erreur de connexion MySQL :', error);
    res.status(500).send('Erreur de connexion à la base de données MySQL');
  }
});

// Routes des utilisateurs
app.use('/api/users', userRoutes);

// Routes des statuts
app.use('/api/statuts', statutRoutes);

// Routes des priorités
app.use('/api/priorites', prioriteRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
