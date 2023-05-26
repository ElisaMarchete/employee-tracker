INSERT INTO department (department_name)
VALUES ("Finance"), 
       ("Engineering"), 
       ("Sales"), 
       ("Legal");

INSERT INTO role (title, salary, role_department_id)
VALUES ("Accountant", 65000.00, 1),
       ("Lawyer", 85000.00, 4),
       ("Software Engineer", 100000.00, 2),
       ("Salesperson", 75000.00, 3),
       ("Sales Lead", 100000.00, 3),
       ("Lead Engineer", 150000.00, 2),
       ("Legal Team Lead", 250000.00, 4);

INSERT INTO employee (first_name, last_name, employee_role_id, employee_manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez", 3, 1),
       ("Kevin", "Tupik", 4, 2),
       ("Malia", "Brown", 1, 2),
       ("Sarah", "Lourd", 3, 1),
       ("Tom", "Allen", 1, 1),
       ("Sam", "Clemens", 2, 2),
       ("Susan", "Smith", 4, 2);

       
