INSERT INTO department (department_name)
VALUES ("Finance"), 
       ("Engineering"), 
       ("Sales"), 
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 65000.00, 1),
       ("Lawyer", 85000.00, 4),
       ("Software Engineer", 100000.00, 2),
       ("Salesperson", 75000.00, 3),
       ("Sales Lead", 100000.00, 3),
       ("Lead Engineer", 150000.00, 2),
       ("Legal Team Lead", 250000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez", 3, NULL),
       ("Kevin", "Tupik", 4, 3),
       ("Malia", "Brown", 5, 3),
       ("Sarah", "Lourd", 6, 2),
       ("Tom", "Allen", 7, 4),
       ("Sam", "Carter", 8, 4);
       
