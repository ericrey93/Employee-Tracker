  INSERT INTO department (departments_name) 
  VALUES 
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

  INSERT INTO roles (title, salary, departments_id)
  VALUES 
  ("Sales Lead", 100000, 1),
  ("Salesperson", 80000, 1),
  ("Lead Engineer", 150000, 2),
  ("Software Engineer", 120000, 2),
  ("Accountant", 125000, 3),
  ("Legal Team Lead", 250000, 4);

  INSERT INTO employee (first_name, last_name, roles_id, manager_id)
  VALUES 
  ('Bob', 'Miller', 1, null),
  ('Charlie', 'Brown', 2, 1),
  ('Jamie', 'Lee', 3, null),
  ('Jimmy', 'Samms', 4, 3),
  ('Anthony', 'Wells', 5, 6),
  ('Tyler', 'Miles', 6, null),
  ('Lenny', 'Kravitz', 2, 1),
  ('Jojo', 'Cena', 4, 3);
