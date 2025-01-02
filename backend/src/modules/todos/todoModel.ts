export interface Todo {
    id_todo?: number;
    title: string;
    description?: string;
    creation_date: Date;
    modification_date: Date;
    due_date: Date;
    modification_reason?: string;
    id_user: number;
    id_priority: number;
    id_status: number;
    id_priority_1: number;
    id_user_1: number;
    id_statut: number;
}

export interface TodoWithRelations extends Todo {
    user_name?: string;        // Pour joindre le nom de l'utilisateur
    priority_label?: string;   // Pour joindre le label de la priorité
    statut_label?: string;     // Pour joindre le label du statut
}

export type TodoCreation = Omit<Todo, 'id_todo' | 'creation_date' | 'modification_date'>;

export type TodoUpdate = Partial<Omit<Todo, 'id_todo' | 'creation_date'>>;