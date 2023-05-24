// const express = require("express");
// const mysql = require("mysql2");
// const consoleTable = require("console.table");

// const PORT = 3001;
// const app = express();

// // create the connection to database
// const connection = mysql.createConnection(
//   {
//     host: "localhost",
//     user: "root",
//     password: "5748962",
//     database: "business_db",
//   },
//   console.log(`Connected to the business_db database.`)
// );

// function quit(answer) {
//   if (answer.options === "Quit") {
//     connection.end();
//     process.exit();
//   }
// }

// // Query database
// function viewDepartments(answer) {
//   if (answer.options === "View All Departments") {
//     connection.query("SELECT * FROM department", function (err, results) {
//       console.log("\n"); // Add a blank line before the table
//       console.table("All Departments", results);
//     });
//   }
// }

// function viewEmployees(answer) {
//   if (answer.options === "View All Employees") {
//     connection.query("SELECT * FROM employee", function (err, results) {
//       console.log("\n"); // Add a blank line before the table
//       console.table("All Employees", results);
//     });
//   }
// }

// function viewRoles(answer) {
//   if (answer.options === "View All Roles") {
//     connection.query("SELECT * FROM role", function (err, results) {
//       console.log("\n"); // Add a blank line before the table
//       console.table("All Roles", results);
//     });
//   }
// }

// function portListener() {
//   app.listen(PORT, () => {
//     console.log("\n");
//     console.log(`Server running on port ${PORT}`);
//   });
// }
