# Task Management Database

## Overview
This database represents a simple task management system where users can create projects, and each project can contain multiple tasks. It helps organize work by linking users, their projects, and the tasks within those projects.

## Tables Created
- users
- projects
- tasks

## Relationships
- One user can create many projects (one-to-many relationship).
- One project can contain many tasks (one-to-many relationship).
- Each project belongs to a single user.
- Each task belongs to a single project.

## Primary Key Explanation
A primary key is a unique identifier for each record in a table. It ensures that no two rows have the same value in that column. In this database, the `id` column in each table is the primary key.

## Foreign Key Explanation
A foreign key is a column that creates a link between two tables. It references the primary key of another table. In this database:
- `projects.user_id` references `users.id`
- `tasks.project_id` references `projects.id`

These relationships help maintain data integrity and connect related data across tables.