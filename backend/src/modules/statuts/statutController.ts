import { Request, Response } from 'express';
import { createStatut, getAllStatuts, getStatutById, updateStatut, deleteStatut } from './statutService';

// Créer un statut
export const createStatutHandler = async (req: Request, res: Response) => {
  try {
    const statut = await createStatut(req.body);
    res.status(201).json({ 
      message: 'Statut créé avec succès',
      id: statut 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la création du statut', 
      error: error.message 
    });
  }
};

// Récupérer tous les statuts
export const getAllStatutsHandler = async (req: Request, res: Response) => {
  try {
    const statuts = await getAllStatuts();
    res.json(statuts);
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des statuts', 
      error: error.message 
    });
  }
};

// Récupérer un statut par ID
export const getStatutByIdHandler = async (req: Request, res: Response) => {
  try {
    const statut = await getStatutById(Number(req.params.id));
    if (statut) {
      res.json(statut);
    } else {
      res.status(404).json({ message: 'Statut non trouvé' });
    }
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du statut', 
      error: error.message 
    });
  }
};

// Mettre à jour un statut
export const updateStatutHandler = async (req: Request, res: Response) => {
  try {
    const updated = await updateStatut(Number(req.params.id), req.body);
    if (updated) {
      res.json({ message: 'Statut mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Statut non trouvé' });
    }
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du statut', 
      error: error.message 
    });
  }
};

// Supprimer un statut
export const deleteStatutHandler = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteStatut(Number(req.params.id));
    if (deleted) {
      res.json({ message: 'Statut supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Statut non trouvé' });
    }
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du statut', 
      error: error.message 
    });
  }
};