-- Création de la base de données
CREATE DATABASE IF NOT EXISTS todolist;

-- Sélection de la base de données
USE todolist;

-- Suppression des tables si elles existent déjà (pour les tests)
DROP TABLE IF EXISTS Users, Statuts, Priorities, ToDo;

-- Création de la Table Users
CREATE TABLE users(
   id INT NOT NULL AUTO_INCREMENT,
   First_name VARCHAR(100)  NOT NULL,
   Last_name VARCHAR(50)  NOT NULL,
   email VARCHAR(50)  NOT NULL,
   salt VARCHAR(50)  NOT NULL,
   password VARCHAR(50)  NOT NULL,
   login_identifier VARCHAR(50)  NOT NULL,
   role VARCHAR(50)  NOT NULL,
   updated_at DATETIME,
   created_at DATETIME,
   PRIMARY KEY(id),
   UNIQUE(email),
   UNIQUE(login_identifier)
);

-- Création de la Table Statuts
CREATE TABLE statuts(
   id INT NOT NULL AUTO_INCREMENT,
   statuts_label VARCHAR(50)  NOT NULL,
   Description VARCHAR(200),
   updated_at DATETIME,
   created_at DATETIME,
   PRIMARY KEY(id),
   UNIQUE(statuts_label)
);

-- Création de la Table Priorities
CREATE TABLE priorities(
   id INT NOT NULL AUTO_INCREMENT,
   priority_label VARCHAR(50)  NOT NULL,
   description VARCHAR(200),
   updated_at DATETIME,
   created_at DATETIME,
   PRIMARY KEY(id)
);

-- Création de la Table ToDo
CREATE TABLE todo(
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(50)  NOT NULL,
   description VARCHAR(1000) ,
   creation_date DATE NOT NULL,
   modification_date DATE NOT NULL,
   due_date DATE NOT NULL,
   modification_reason VARCHAR(1000) ,
   id_user INT NOT NULL,
   id_priority INT NOT NULL,
   id_statut INT NOT NULL,
   updated_at DATETIME,
   created_at DATETIME,
   PRIMARY KEY(id),
   FOREIGN KEY(id_priority) REFERENCES Priorities(id),
   FOREIGN KEY(id_user) REFERENCES Users(id),
   FOREIGN KEY(id_statut) REFERENCES Statuts(id)
);




-- Script pour remplir la BDD

-- Sélection de la base de données
USE todolist;

-- Remplissage de la table Users avec 10 utilisateurs
INSERT INTO users (First_name, Last_name, email, salt, password, login_identifier, role, updated_at, created_at) 
VALUES
('Alice', 'Dupont', 'alice.dupont@example.com', 'salt123', 'password1', 'alice123', 'admin', NOW(), NOW()),
('Bob', 'Martin', 'bob.martin@example.com', 'salt456', 'password2', 'bob456', 'user', NOW(), NOW()),
('Charlie', 'Leroy', 'charlie.leroy@example.com', 'salt789', 'password3', 'charlie789', 'user', NOW(), NOW()),
('David', 'Durand', 'david.durand@example.com', 'salt321', 'password4', 'david321', 'user', NOW(), NOW()),
('Emma', 'Moreau', 'emma.moreau@example.com', 'salt654', 'password5', 'emma654', 'admin', NOW(), NOW()),
('Fanny', 'Roux', 'fanny.roux@example.com', 'salt987', 'password6', 'fanny987', 'user', NOW(), NOW()),
('Gabriel', 'Blanc', 'gabriel.blanc@example.com', 'salt246', 'password7', 'gabriel246', 'user', NOW(), NOW()),
('Hugo', 'Bertrand', 'hugo.bertrand@example.com', 'salt135', 'password8', 'hugo135', 'admin', NOW(), NOW()),
('Isabelle', 'Guillot', 'isabelle.guillot@example.com', 'salt864', 'password9', 'isabelle864', 'user', NOW(), NOW()),
('Julien', 'Fontaine', 'julien.fontaine@example.com', 'salt579', 'password10', 'julien579', 'user', NOW(), NOW());

-- Remplissage de la table Statuts
INSERT INTO statuts (statuts_label, Description)
VALUES
('En cours', 'La tache est en cours de traitement'),
('Terminee', 'La tache a ete completee'),
('A faire', 'La tache doit encore etre commencee');

-- Remplissage de la table Priorities
INSERT INTO priorities (priority_label, description)
VALUES
('Haute', 'Tache a priorite haute'),
('Moyenne', 'Tache a priorite moyenne'),
('Basse', 'Tache a priorite basse');

-- Remplissage de la table ToDo avec 10 taches sans accents
INSERT INTO todo (title, description, creation_date, modification_date, due_date, modification_reason, id_user, id_priority, id_statut)
VALUES
('Acheter des fournitures', 'Acheter des stylos et cahiers pour le bureau', CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'Nouvelle tache', 1, 1, 1),
('Preparer la reunion', 'Organiser l ordre du jour et les presentations', CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'Urgent', 2, 2, 2),
('Faire une pause', 'Prendre 15 minutes pour se detendre', CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 'Bien-etre', 3, 3, 3);

-- Vérification des données insérées
SELECT * FROM users;
SELECT * FROM statuts;
SELECT * FROM priorities;
SELECT * FROM todo;
