import {
    getAllPriorites,
    getPrioriteById,
    createPriorite,
    updatePriorite,
    deletePriorite,
  } from './prioriteModel';
  
  export const fetchAllPriorites = async () => {
    return await getAllPriorites();
  };
  
  export const fetchPrioriteById = async (id: number) => {
    return await getPrioriteById(id);
  };
  
  export const addPriorite = async (data: { priority_label: string; description?: string }) => {
    await createPriorite(data);
  };
  
  export const modifyPriorite = async (id: number, data: { priority_label: string; description?: string }) => {
    await updatePriorite(id, data);
  };
  
  export const removePriorite = async (id: number) => {
    await deletePriorite(id);
  };
  