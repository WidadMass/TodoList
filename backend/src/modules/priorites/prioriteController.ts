import { Request, Response } from 'express';
import { createPriorite, getAllPriorites, getPrioriteById, updatePriorite, deletePriorite } from './prioriteService';

// Créer une priorité
export const createPrioriteHandler = async (req: Request, res: Response) => {
  try {
    const priorite = await createPriorite(req.body);
    res.status(201).json({ 
      message: 'Priorité créée avec succès',
      id: priorite 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la création de la priorité', 
      error: error.message 
    });
  }
};

// Récupérer toutes les priorités
export const getAllPrioritesHandler = async (req: Request, res: Response) => {
  try {
    const priorites = await getAllPriorites();
    res.json(priorites);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des priorités', 
      error: error.message 
    });
  }
};

// Récupérer une priorité par ID
export const getPrioriteByIdHandler = async (req: Request, res: Response) => {
  try {
    const priorite = await getPrioriteById(Number(req.params.id));
    if (priorite) {
      res.json(priorite);
    } else {
      res.status(404).json({ message: 'Priorité non trouvée' });
    }
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de la priorité', 
      error: error.message 
    });
  }
};

// Mettre à jour une priorité
export const updatePrioriteHandler = async (req: Request, res: Response) => {
  try {
    const updated = await updatePriorite(Number(req.params.id), req.body);
    if (updated) {
      res.json({ message: 'Priorité mise à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Priorité non trouvée' });
    }
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour de la priorité', 
      error: error.message 
    });
  }
};

// Supprimer une priorité
export const deletePrioriteHandler = async (req: Request, res: Response) => {
  try {
    const deleted = await deletePriorite(Number(req.params.id));
    if (deleted) {
      res.json({ message: 'Priorité supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Priorité non trouvée' });
    }
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression de la priorité', 
      error: error.message 
    });
  }
};