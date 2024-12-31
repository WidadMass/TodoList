export interface Statut {
  id_statut: number;
  status_label: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export type StatutCreation = Pick<Statut, 'status_label' | 'description'>;
