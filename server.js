// loading modules
const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");

const PORT = 3001;
const app = express();

// Function to ask user questions
function getInput() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "'What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
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

      // Query database
      connection.query("SELECT * FROM department", function (err, results) {
        if (err) {
          console.log("failed to run query");
          return;
        } else console.log(results);

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      });

      // console.log(answers);
      //   generateFile(answers);
    });
}

// Function call to initialize app
getInput();
