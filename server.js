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

  if (answer.options !== "Add Department") {
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
    .then((answer) => {
      processAnswer(answer);
    });
}

// Function call to initialize app
userInput();
