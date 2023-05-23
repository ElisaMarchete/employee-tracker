INSERT INTO department (id, department_name)
VALUES (101, "Finance"), 
       (102, "Engineering"), 
       (103, "Sales"), 
       (104, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Accountant", 75000, 101), 
       (002, "Software Engineer", 100000, 102), 
       (003, "Sales Lead", 100000, 103), 
       (004, "Lawyer", 190000, 104);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (121, "John", "Fonseca", 001, NULL), 
       (122, "Jane", "Silva", 002, 121), 
       (123, "Alice", "Mcdonalds", 003, 122), 
       (124, "Bob", "Marley", 004, 123);
