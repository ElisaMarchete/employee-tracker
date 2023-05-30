USE business_db;

SELECT * FROM employee;
DELETE FROM employee WHERE id = 10;
SELECT * FROM role;
DELETE FROM role WHERE id IN (8, 9);
SELECT * FROM department;
DELETE FROM department WHERE id IN (5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);


SELECT role.id, role.title, role.salary, department.department_name
FROM role 
JOIN department
ON role.role_department_id = department.id

SELECT 
  e.id,
  e.first_name,
  e.last_name,
  r.title,
  d.department_name,
  r.salary,
  CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM
  employee AS e
  JOIN role AS r ON e.employee_role_id = r.id
  JOIN department AS d ON r.role_department_id = d.id
  LEFT JOIN employee AS m ON e.employee_manager_id = m.id

 