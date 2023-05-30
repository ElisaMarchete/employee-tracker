// loading modules
const inquirer = require("inquirer");
const queries = require("./lib/queries");
// const clear = require("clear");

// Function to ask user questions and display table
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
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "View Total Utilized Budget",
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
// Calling the function
userInput();

// Function to display the table
function processAnswer(answer) {
  if (answer.options === "Quit") {
    console.log("Exiting the program...");
    process.exit(0); // 0 indicates a successful exit
  }

  queries.viewTables(answer);
  queries.addDepartment(answer);
  queries.addRole(answer);
  queries.addEmployee(answer);
  queries.updateEmployee(answer);
  queries.viewBudget(answer);
  queries.deleteInfo(answer);

  if (
    answer.options !== "Add Department" &&
    answer.options !== "Add Role" &&
    answer.options !== "Add Employee" &&
    answer.options !== "Update Employee Role"
  ) {
    userInput();
  }
}
