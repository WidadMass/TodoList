export interface Priorite {
    id_priority?: number;
    priority_label: string;
    description?: string;
}

export type PrioriteCreation = Pick<Priorite, 'priority_label' | 'description'>;