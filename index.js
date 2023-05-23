// loading modules
const inquirer = require("inquirer");

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
      console.log(answers);
      //   generateFile(answers);
    });
}

// Function call to initialize app
getInput();
