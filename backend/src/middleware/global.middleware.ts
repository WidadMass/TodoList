import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

export const setupGlobalMiddleware = (app: Express) => {
  // Protection des en-têtes HTTP
  app.use(helmet());
  
  // Activation CORS
  app.use(cors());
  
  // Parser pour JSON
  app.use(express.json());
  
  // Parser pour les données de formulaire
  app.use(express.urlencoded({ extended: true }));
  
  // Logger les requêtes
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
};