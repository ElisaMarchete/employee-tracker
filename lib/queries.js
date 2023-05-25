const express = require("express");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const inquirer = require("inquirer");

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
      console.log("\n"); // Add a blank line before the table
      console.table("All Departments", results);
    });
  } else if (answer.options === "View All Employees") {
    connection.query("SELECT * FROM employee", function (err, results) {
      console.log("\n"); // Add a blank line before the table
      console.table("All Employees", results);
    });
  } else if (answer.options === "View All Roles") {
    connection.query("SELECT * FROM role", function (err, results) {
      console.log("\n"); // Add a blank line before the table
      console.table("All Roles", results);
    });
  }
}

function addDataTables(answer) {
  if (answer.options === "Add Department") {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department?",
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

function portListener() {
  app.listen(PORT, () => {
    console.log("\n");
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = {
  viewTables,
  portListener,
  addDataTables,
};
