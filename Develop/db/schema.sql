DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
id INT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10, 2),
department_id INT,
FOREIGN KEY(department_id)
REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee (
id INT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT NOT NULL,
FOREIGN KEY(role_id)
REFERENCES role(id)
);