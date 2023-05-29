SELECT 
employee.id, 
employee.first_name, 
employee.last_name, 
role.title, 
department.department_name,
role.salary, 
employee.employee_manager_id
FROM employee
INNER JOIN role
ON employee.employee_role_id = role.id
INNER JOIN department
ON role.role_department_id = department.id
