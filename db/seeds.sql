USE employee_db;
-- Departments
INSERT INTO department (name) VALUES 
('Sales'), 
('IT'), 
('Facilities'), 
('Human-Resources'), 
('Finance'), 
('Operations');
-- Roles 
INSERT INTO role (title, salary, department_id) VALUES 
('Account Sales Executive', 65000, 1), 
('Softare Engineer', 95000, 2), 
('Security', 25000, 3), 
('HR Manager', 45000, 4),
('Accountant', 75500, 5);
('Operations Manager', 74000, 6), 
('Controller', 95000, 7), 

-- Employees 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Michelle', 'Johnson', 4, NULL),
('Samantha', 'Herrera', 7, 1),
('Dillon', 'Clayton', 5, 1),
('Ruben', 'Bowers', 1, 1),
('Aryan', 'Nielson', 3, 1),
('Halle', 'Church', 2, 1),
('Levi', 'Morrison', 6, 1);