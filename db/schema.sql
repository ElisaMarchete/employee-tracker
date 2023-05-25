DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT, 
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  role_department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  employee_role_id INT,
  employee_manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (employee_role_id) REFERENCES role(id),
  FOREIGN KEY (employee_manager_id) REFERENCES employee(id)
);
