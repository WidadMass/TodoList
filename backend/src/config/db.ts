import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    });

    console.log('🚀 Connecté à MySQL');
    return connection;
  } catch (error) {
    console.error('Erreur de connexion à MySQL :', error);
    process.exit(1);
  }
};

export default connectDB;
