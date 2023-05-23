INSERT INTO department (id, department_name)
VALUES (001, "Finance"), 
       (002, "Engineering"), 
       (003, "Sales"), 
       (004, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Accountant", 75000, 001), 
       (002, "Software Engineer", 100000, 002), 
       (003, "Sales Lead", 100000, 003), 
       (004, "Lawyer", 190000, 004);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "John", "Fonseca", 001, NULL), 
       (002, "Jane", "Silva", 002, 001), 
       (003, "Alice", "Mcdonalds", 003, 002), 
       (004, "Bob", "Marley", 004, 003);
