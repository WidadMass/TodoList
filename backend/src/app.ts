import express from 'express';
import pool from './config/db';
import userRoutes from './modules/user/userRoutes';  // Importation des routes du module user

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser les données JSON
app.use(express.json()); 

// Route pour tester la connexion à la base de données
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.send(`Connexion réussie ! Résultat : ${JSON.stringify(rows)}`);
  } catch (error) {
    console.error('Erreur de connexion MySQL :', error);
    res.status(500).send('Erreur de connexion à MySQL');
  }
});

// Utilisation des routes pour le module `user`
// Préfixe /api/users pour toutes les routes liées aux utilisateurs
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
