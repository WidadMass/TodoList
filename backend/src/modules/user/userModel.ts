export interface User {
    id_user?: number;
    First_name: string;
    Last_name: string;
    email: string;
    salt?: string;
    password: string;
    login_identifier?: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export type UserCreation = Pick<User, 'First_name' | 'email' | 'password'>;
  