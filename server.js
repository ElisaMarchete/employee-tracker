// loading modules
const inquirer = require("inquirer");
const queries = require("./lib/queries");

// Function to display the table
function processAnswer(answer) {
  if (answer.options === "Quit") {
    console.log("Exiting the program...");
    process.exit(0); // 0 indicates a successful exit
  }

  queries.viewTables(answer);
  queries.addDataTables(answer);
  queries.addRoleTables(answer);

  if (answer.options !== "Add Department" && answer.options !== "Add Role") {
    userInput();
  }
}

// Function to ask user questions and display table
function userInput() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      processAnswer(answer);
    });
}

// Function call to initialize app
userInput();
