const express = require("express");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
// const clear = require("clear");

const PORT = 3001;
const app = express();

// create the connection to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "5748962",
    database: "business_db",
  },
  console.log(`Connected to the business_db database.`)
);

function viewTables(answer) {
  if (answer.options === "View All Departments") {
    // console.log({ answer });
    connection.query("SELECT * FROM department", function (err, results) {
      console.table("\n"); // Add a blank line before the table
      console.table("All Departments", results);
    });
  } else if (answer.options === "View All Employees") {
    connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.employee_manager_id FROM employee INNER JOIN role ON employee.employee_role_id = role.id INNER JOIN department ON role.role_department_id = department.id",
      function (err, results) {
        console.table("\n"); // Add a blank line before the table
        console.table("All Employees", results);
      }
    );
  } else if (answer.options === "View All Roles") {
    connection.query("SELECT * FROM role", function (err, results) {
      console.table("\n"); // Add a blank line before the table
      console.table("All Roles", results);
    });
  }
}

function addDepartment(answer) {
  if (answer.options === "Add Department") {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "\n What is the name of the department?",
        },
      ])
      .then((response) => {
        const departmentName = response.name;
        connection.query(
          "INSERT INTO department (department_name) VALUES (?)",
          departmentName,
          function (err, results) {
            if (err) throw err;
            console.log("Department added successfully!");
          }
        );
      });
  }
}

function addRole(answer) {
  if (answer.options === "Add Role") {
    connection.query("SELECT * FROM department", function (err, rows) {
      if (err) {
        console.error("Error retrieving departments:", err);
        return;
      }

      const departments = rows.map((row) => row.department_name);

      inquirer
        .prompt([
          {
            type: "input",
            name: "roleTitle",
            message: "\n What is the title of the role?",
          },
          {
            type: "input",
            name: "roleSalary",
            message: "\n What is the salary of the role?",
          },
          {
            type: "list",
            name: "roleDepartment",
            message: "\n What is the department of the role?",
            choices: departments,
          },
        ])
        .then((response) => {
          const roleDepartment = response.roleDepartment;
          // console.table(roleDepartment);

          // Perform SQL query to get department ID
          connection.query(
            "SELECT id FROM department WHERE department_name = ?",
            [roleDepartment],
            function (error, results, fields) {
              if (error) {
                console.error(error);
              } else {
                const departmentId = results[0].id;
                const roleTitle = response.roleTitle;
                const roleSalary = response.roleSalary;
                // console.table(departmentId);

                connection.query(
                  "INSERT INTO role (title, salary, role_department_id) VALUES (?, ?, ?)",
                  [roleTitle, roleSalary, departmentId],
                  function (err, results) {
                    if (err) throw err;
                    console.log("Role added successfully!");
                  }
                );
              }
            }
          );
        });
    });
  }
}

function addEmployee(answer) {
  if (answer.options === "Add Employee") {
    connection.query("SELECT * FROM role", function (err, rows) {
      if (err) {
        console.error("Error retrieving role:", err);
        return;
      }

      const role = rows.map((row) => row.title);
    
    connection.query("SELECT * FROM employee", function (err, rows) {
      if (err) {
        console.error("Error retrieving employee:", err);
        return;
      }

      const manager = rows.map((row) => row.employee_manager_id);

      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "\n What is the employee first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "\n What is the employee last name?",
          },
          {
            type: "list",
            name: "roleDepartment",
            message: "\n What is the department of the role?",
            choices: departments,
          },
        ])
        .then((response) => {
          const roleDepartment = response.roleDepartment;
          // console.table(roleDepartment);

          // Perform SQL query to get department ID
          connection.query(
            "SELECT id FROM department WHERE department_name = ?",
            [roleDepartment],
            function (error, results, fields) {
              if (error) {
                console.error(error);
              } else {
                const departmentId = results[0].id;
                const roleTitle = response.roleTitle;
                const roleSalary = response.roleSalary;
                // console.table(departmentId);

                connection.query(
                  "INSERT INTO role (title, salary, role_department_id) VALUES (?, ?, ?)",
                  [roleTitle, roleSalary, departmentId],
                  function (err, results) {
                    if (err) throw err;
                    console.log("Role added successfully!");
                  }
                );
              }
            }
          );
        });
    });
  }
}

function portListener() {
  app.listen(PORT, () => {
    // console.log("\n");
    console.log(`\n Server running on port ${PORT}`);
  });
}

module.exports = {
  viewTables,
  portListener,
  addDepartment,
  addRole,
};
