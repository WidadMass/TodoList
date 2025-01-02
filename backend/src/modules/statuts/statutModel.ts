export interface Statut {
    id_statut?: number;
    statuts_label: string;
    Description?: string;
}

export type StatutCreation = Pick<Statut, 'statuts_label' | 'Description'>;