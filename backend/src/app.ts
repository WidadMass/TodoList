import express from 'express';
import pool from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.send(`Connexion réussie ! Résultat : ${JSON.stringify(rows)}`);
  } catch (error) {
    console.error('Erreur de connexion MySQL :', error);
    res.status(500).send('Erreur de connexion à MySQL');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
