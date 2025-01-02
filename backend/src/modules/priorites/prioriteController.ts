import { Request, Response } from 'express';
import {
  fetchAllPriorites,
  fetchPrioriteById,
  addPriorite,
  modifyPriorite,
  removePriorite,
} from './prioriteService';

export const getPriorites = async (req: Request, res: Response) => {
  try {
    const priorites = await fetchAllPriorites();
    res.json(priorites);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des priorités', error });
  }
};

export const getPriorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const priorite = await fetchPrioriteById(Number(id));
    if (priorite) {
      res.json(priorite);
    } else {
      res.status(404).json({ message: 'Priorité introuvable' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la priorité', error });
  }
};

export const createPrioriteHandler = async (req: Request, res: Response) => {
  try {
    const { priority_label, description } = req.body;
    await addPriorite({ priority_label, description });
    res.status(201).json({ message: 'Priorité créée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la priorité', error });
  }
};

export const updatePrioriteHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { priority_label, description } = req.body;
    await modifyPriorite(Number(id), { priority_label, description });
    res.json({ message: 'Priorité mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la priorité', error });
  }
};

export const deletePrioriteHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await removePriorite(Number(id));
    res.json({ message: 'Priorité supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la priorité', error });
  }
};
