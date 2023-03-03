const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Penguins!93',
    database: 'employees_db'
});

connection.connect(function (err) {
    if(err) throw err;
    startApp();
});

function startApp() {
    inquirer.prompt ({
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Quit"
        ]
    }).then(function ({menu}) {
    switch (menu) {
        case 'View all Departments':
            departmentView();
            break;
        case 'View all Roles':
            roleView();
            break;
        case 'View all Employees':
            employeeView();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update an Employee Role':
            updateEmployee();
            break;
        case 'Quit':
            quitApp();
            break;
    }
  });
}

function departmentView() {
    console.log('Showing Departments');
    let query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        startApp();
    });
}

function roleView() {
    console.log('Showing all Roles');
    var query = `SELECT roles.id, roles.title, roles.salary, 
    department.departments_name AS department 
    FROM roles 
    JOIN department ON roles.departments_id = department.id`;
    connection.query(query, (err, res) => {
        if(err) throw err;

        console.table(res);
        startApp();
    });
}

function employeeView() {
    console.log('Showing all Employees');
    var query = `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS position, department.departments_name AS department, roles.salary
    FROM employee
    JOIN roles ON employee.roles_id = roles.id
    JOIN department ON roles.departments_id = department.id`;
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        startApp();
    });
}

function addDepartment() {
    showAddDepartment();
}

function showAddDepartment() {
    inquirer.prompt([
        {
        type: 'input',
        name: "depoName",
        message: "Please type the name of the new department."
    },
  ]).then(function (answer) {
    var query = `INSERT INTO department SET ?`

    connection.execute(query, {
        departments_name: answer.depoName
    }, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log("Department has been added!");
        startApp();
    });
  });
};


function addRole() {
var query = `SELECT id, departments_name FROM employees_db.department`;

connection.execute(query, (err, res) => {
    if(err) throw err;
    let departments = res.map(function(r) { return {name: r.name, value: r.id} });
    showAddRole(departments);
});
}

function showAddRole(department) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Please enter the role title.'
        },
        {
            type: 'input',
            name: 'salaryAmount',
            message: 'Please enter the salary of the role.'
        },
        {
            type: 'list',
            name: 'departmentName',
            message: 'What department does the role belong too?',
            choices: department
        },
    ]).then(function(answers) {
        var query = `INSERT INTO roles SET ?`;
        connection.query(query, {
            title: answers.roleName,
            salary: answers.salaryAmount,
            departments_id: answers.departmentName
        }, (err, res) => {
            if(err) throw err; 
            console.table(res);
            console.log('A new role has been added!');
            startApp();
        });
    });
}

function addEmployee() {

}

function updateEmployee() {

}

function quitApp() {

}
