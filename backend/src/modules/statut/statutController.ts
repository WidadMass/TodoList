import { Request, Response } from 'express';
import * as statutService from './statutService';  // Import des fonctions du service
import { StatutCreation } from './statutModel';

// Créer un statut
export const createStatut = async (req: Request, res: Response) => {
  const { statuts_label, description }: StatutCreation = req.body;
  
  try {
    const statut = await statutService.createStatut({ statuts_label, description });
    res.status(201).json(statut);
  } catch (error: unknown) {  // Déclarer le type de error comme unknown
    if (error instanceof Error) {  // Vérifier si l'erreur est une instance d'Error
      res.status(500).json({ message: 'Erreur lors de la création du statut', error: error.message });
    } else {
      res.status(500).json({ message: 'Erreur inconnue lors de la création du statut' });
    }
  }
};

// Récupérer tous les statuts
export const fetchAllStatuts = async (req: Request, res: Response) => {
  try {
    const statuts = await statutService.getAllStatuts();
    res.json(statuts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des statuts', error: error.message });
    } else {
      res.status(500).json({ message: 'Erreur inconnue lors de la récupération des statuts' });
    }
  }
};

// Récupérer un statut par ID
export const fetchStatutById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const statut = await statutService.getStatutById(Number(id));
    if (statut) {
      res.json(statut);
    } else {
      res.status(404).json({ message: 'Statut non trouvé' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du statut', error: error.message });
    } else {
      res.status(500).json({ message: 'Erreur inconnue lors de la récupération du statut' });
    }
  }
};

// Mettre à jour un statut par ID
export const updateStatutById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statuts_label, description }: StatutCreation = req.body;
  
  try {
    const updated = await statutService.updateStatut(Number(id), { statuts_label, description });
    if (updated) {
      res.json({ message: 'Statut mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Statut non trouvé' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du statut', error: error.message });
    } else {
      res.status(500).json({ message: 'Erreur inconnue lors de la mise à jour du statut' });
    }
  }
};

// Supprimer un statut par ID
export const deleteStatutById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const deleted = await statutService.deleteStatut(Number(id));
    if (deleted) {
      res.json({ message: 'Statut supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Statut non trouvé' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du statut', error: error.message });
    } else {
      res.status(500).json({ message: 'Erreur inconnue lors de la suppression du statut' });
    }
  }
};
