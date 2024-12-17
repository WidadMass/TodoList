export interface User {
    id?: number;              // ID généré automatiquement (AUTO_INCREMENT)
    name: string;             // Nom de l'utilisateur
    email: string;            // Email (unique)
    password: string;         // Mot de passe haché
    created_at?: Date;        // Date de création de l'utilisateur
  }
  