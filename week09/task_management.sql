-- Part 1: Create Database
CREATE DATABASE task_management_db;
USE task_management_db;

-- Part 3: Create Tables

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Projects Table
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tasks Table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    project_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Part 4: Insert Sample Data

-- Users
INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com');

-- Projects
INSERT INTO projects (name, description, user_id) VALUES
('Website Redesign', 'Update company website', 1),
('Mobile App', 'Build mobile application', 2),
('Database Setup', 'Design database schema', 3);

-- Tasks
INSERT INTO tasks (title, status, project_id) VALUES
('Create wireframes', 'completed', 1),
('Develop frontend', 'in progress', 1),
('Set up backend', 'completed', 2),
('Design database tables', 'completed', 3),
('Write API endpoints', 'pending', 2);

-- Part 5: Queries

-- Query 1: Show all users
SELECT * FROM users;

-- Query 2: Show all projects
SELECT * FROM projects;

-- Query 3: Show all tasks
SELECT * FROM tasks;

-- Query 4: Tasks with project names (JOIN)
SELECT 
    tasks.title,
    tasks.status,
    projects.name AS project_name
FROM tasks
JOIN projects ON tasks.project_id = projects.id;

-- Query 5: Projects with user names (JOIN)
SELECT 
    projects.name AS project_name,
    users.name AS user_name
FROM projects
JOIN users ON projects.user_id = users.id;

-- Query 6: Only completed tasks
SELECT * FROM tasks
WHERE status = 'completed';

-- Query 7: Tasks sorted alphabetically
SELECT * FROM tasks
ORDER BY title ASC;