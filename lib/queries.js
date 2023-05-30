const express = require("express");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
const dotenv = require("dotenv").config();

const PORT = 3001;
const app = express();

// create the connection to database
const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  console.log(`Connected to the business_db database.`)
);

function processAnswer(answer) {
  if (answer.options === "Quit") {
    console.log("Exiting the program...");
    process.exit(0); // 0 indicates a successful exit
  }

  viewTables(answer);
  addDepartment(answer);
  addRole(answer);
  addEmployee(answer);
  updateEmployee(answer);
  viewBudget(answer);
  deleteDepartment(answer);
  deleteRole(answer);
  deleteEmployee(answer);

  if (
    answer.options !== "Add Department" &&
    answer.options !== "Add Role" &&
    answer.options !== "Add Employee" &&
    answer.options !== "Update Employee Role" &&
    answer.options !== "Delete Department" &&
    answer.options !== "Delete Role" &&
    answer.options !== "Delete Employee"
  ) {
    userInput();
  }
}

function userInput() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "\n What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "View Total Utilized Budget",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      processAnswer(answer);
    });
}

function viewTables(answer) {
  if (answer.options === "View All Departments") {
    const queryAllDepartments = `SELECT * FROM department`;

    connection.query(queryAllDepartments, (err, results) => {
      console.table("\n"); // Add a blank line before the table
      console.table("All Departments", results);
    });
  } else if (answer.options === "View All Employees") {
    const queryAllEmployees = `
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
    LEFT JOIN employee AS m ON e.employee_manager_id = m.id `;

    connection.query(queryAllEmployees, (err, results) => {
      console.table("\n"); // Add a blank line before the table
      console.table("All Employees", results);
    });
  } else if (answer.options === "View All Roles") {
    const queryAllRoles = `SELECT role.id, role.title, department.department_name as department, role.salary FROM role JOIN department ON role.role_department_id = department.id`;
    connection.query(queryAllRoles, (err, results) => {
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
            console.table("\n"); // Add a blank line before the table
            console.log("Department added successfully!");
          }
        );
        userInput();
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

                connection.query(
                  "INSERT INTO role (title, salary, role_department_id) VALUES (?, ?, ?)",
                  [roleTitle, roleSalary, departmentId],
                  function (err, results) {
                    if (err) throw err;
                    console.table("\n"); // Add a blank line before the table
                    console.log("Role added successfully!");
                  }
                );

                userInput();
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
      const employeeRole = rows.map((row) => row.title);

      connection.query("SELECT * FROM employee", function (err, rows) {
        if (err) {
          console.error("Error retrieving employee:", err);
          return;
        }
        const employeeManager = rows.map(
          (row) => row.first_name + " " + row.last_name
        );

        inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: "\n What is the employee's first name?",
            },
            {
              type: "input",
              name: "lastName",
              message: "\n What is the employee's last name?",
            },
            {
              type: "list",
              name: "employeeRole",
              message: "\n What is the employee's role?",
              choices: employeeRole,
            },
            {
              type: "list",
              name: "employeeManager",
              message: "\n What is the employee's manager?",
              choices: employeeManager,
            },
          ])
          .then((response) => {
            const firstName = response.firstName;
            const lastName = response.lastName;
            const employeeRole = response.employeeRole;
            //split the employee manager name into first and last name
            const employeeManager = response.employeeManager;

            connection.query(
              "SELECT id FROM role WHERE title = ?",
              [employeeRole],
              function (error, results, fields) {
                if (error) {
                  console.error(error);
                } else {
                  const employeeRoleId = results[0].id;

                  connection.query(
                    "SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?",
                    [employeeManager],
                    function (error, results, fields) {
                      if (error) {
                        console.error(error);
                      } else {
                        const employeeManagerId = results[0].id;

                        connection.query(
                          "INSERT INTO employee (first_name, last_name, employee_role_id, employee_manager_id) VALUES (?, ?, ?, ?)",
                          [
                            firstName,
                            lastName,
                            employeeRoleId,
                            employeeManagerId,
                          ],
                          function (err, results) {
                            if (err) throw err;
                            console.log("\n"); // Add a blank line before the table
                            console.log("Employee added successfully!");
                          }
                        );
                      }
                    }
                  );
                  userInput();
                }
              }
            );
          });
      });
    });
  }
}

function updateEmployee(answer) {
  if (answer.options === "Update Employee Role") {
    connection.query("SELECT * FROM employee", function (err, rows) {
      if (err) {
        console.error("Error retrieving employee:", err);
        return;
      }

      const employeeList = rows.map(
        (row) => row.first_name + " " + row.last_name
      );

      connection.query("SELECT * FROM role", function (err, rows) {
        if (err) {
          console.error("Error retrieving role:", err);
          return;
        }

        const roleList = rows.map((row) => row.title);

        inquirer
          .prompt([
            {
              type: "list",
              name: "employeeName",
              choices: employeeList,
            },
            {
              type: "list",
              name: "roleTitle",
              message:
                "\n which role do you want to assign the selected employee?",
              choices: roleList,
            },
          ])
          .then((response) => {
            const roleTitle = response.roleTitle;

            connection.query(
              "SELECT id FROM role WHERE title = ?",
              [roleTitle],
              function (error, results, fields) {
                if (error) {
                  console.error(error);
                } else {
                  const roleTitleId = results[0].id;
                  const employeeName = response.employeeName;

                  connection.query(
                    "UPDATE employee SET employee_role_id = ? WHERE CONCAT(first_name, ' ', last_name) = ?",
                    [roleTitleId, employeeName],
                    function (err, results) {
                      if (err) throw err;
                      console.log("\n");
                      console.log("New role added successfully!");
                    }
                  );
                  userInput();
                }
              }
            );
          });
      });
    });
  }
}

function viewBudget(answer) {
  if (answer.options === "View Total Utilized Budget") {
    connection.query(
      "SELECT department.department_name, SUM(role.salary) AS budget FROM employee LEFT JOIN role ON employee.employee_role_id = role.id LEFT JOIN department ON role.role_department_id = department.id GROUP BY department.department_name",
      function (err, rows) {
        if (err) {
          console.error("Error retrieving department:", err);
          return;
        }
        console.table("\n"); // Add a blank line before the table
        console.table("Total Utilized Budget", rows);
      }
    );
  }
}

function deleteDepartment(answer) {
  if (answer.options === "Delete Department") {
    connection.query("SELECT * FROM department", function (err, rows) {
      if (err) {
        console.error("Error retrieving department:", err);
        return;
      }
      const departments = rows.map((row) => row.department_name);

      inquirer
        .prompt([
          {
            type: "list",
            name: "departmentName",
            message: "\n Which department do you want to delete?",
            choices: departments,
          },
        ])
        .then((response) => {
          const departmentName = response.departmentName;
          console.log({ departmentName });
          connection.query(
            "DELETE FROM department WHERE department_name = ?",
            [departmentName],
            function (err, results) {
              if (results === undefined) {
                console.log("\n");
                console.log(
                  "It cannot be deleted because it is being used by another table."
                );
              } else {
                console.log("\n");
                console.log("Department deleted successfully!");
              }
            }
          );
          userInput();
        });
    });
  }
}

function deleteRole(answer) {
  if (answer.options === "Delete Role") {
    connection.query("SELECT * FROM role", function (err, rows) {
      if (err) {
        console.error("Error retrieving role:", err);
        return;
      }
      const roles = rows.map((row) => row.title);

      inquirer
        .prompt([
          {
            type: "list",
            name: "roleName",
            message: "\n Which role do you want to delete?",
            choices: roles,
          },
        ])
        .then((response) => {
          const roleName = response.roleName;

          connection.query(
            "DELETE FROM role WHERE title = ?",
            [roleName],
            function (err, results) {
              if (results === undefined) {
                console.log("\n");
                console.log(
                  "It cannot be deleted because it is being used by another table."
                );
              } else {
                console.log("\n");
                console.log("Role deleted successfully!");
              }
            }
          );
          userInput();
        });
    });
  }
}

function deleteEmployee(answer) {
  if (answer.options === "Delete Employee") {
    connection.query("SELECT * FROM employee", function (err, rows) {
      if (err) {
        console.error("Error retrieving employee:", err);
        return;
      }
      const employees = rows.map((row) => row.first_name + " " + row.last_name);

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeName",
            message: "\n Which employee do you want to delete?",
            choices: employees,
          },
        ])
        .then((response) => {
          const employeeName = response.employeeName;

          connection.query(
            "DELETE FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?",
            [employeeName],
            function (err, results) {
              if (results === undefined) {
                console.log("\n");
                console.log(
                  "It cannot be deleted because it is being used by another table."
                );
              } else {
                console.log("\n");
                console.log("Employee deleted successfully!");
              }
            }
          );
          userInput();
        });
    });
  }
}

module.exports = {
  userInput,
};
