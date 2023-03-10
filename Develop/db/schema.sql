DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
departments_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NULL,
salary DECIMAL(10, 0) NULL,
departments_id INT,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
roles_id INT,
manager_id INT,
PRIMARY KEY (id)
);