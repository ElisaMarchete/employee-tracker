DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE department (
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY (id)
  FOREIGN KEY (department_id) REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    ON DELETE SET NULL
    );