const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const connection = mysql.connection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Penguins!93',
    database: 'employees_db'
});

console.log("Welcome to the Employee Tracker System!")

startApp();

function startApp() {
    inquirer.prompt ({
        
    })
}

