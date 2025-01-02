import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Mise à jour de la déclaration globale
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>; // Modification ici pour utiliser Record<string, any>
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Token d\'authentification manquant' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'your-secret-key');
      
      if (typeof decoded === 'string') {
        res.status(401).json({ message: 'Token invalide' });
        return;
      }

      req.user = decoded; // decoded est maintenant automatiquement compatible avec Record<string, any>
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token invalide' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur d\'authentification' });
  }
};

export default authMiddleware;