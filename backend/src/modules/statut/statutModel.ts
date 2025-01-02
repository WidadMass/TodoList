export interface Statut {
  id_statut: number;
  statuts_label: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export type StatutCreation = Pick<Statut, 'statuts_label' | 'description'>;
