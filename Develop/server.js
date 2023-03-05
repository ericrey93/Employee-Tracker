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
            updateEmployeeRole();
            break;
        case 'Quit':
            console.log("App has ended.");
            connection.end();
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
    showDepoAdded();
}

function showDepoAdded() {
    inquirer.prompt([
        {
        type: 'input',
        name: "depoName",
        message: "Please type the name of the new department."
    },
  ]).then(function (answer) {
    var query = `INSERT INTO department SET ?`

    connection.query(query, {
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

connection.query(query, (err, res) => {
    if(err) throw err;
    let departments = res.map(({ id, departments_name}) => ({
        value: id, name: `${departments_name}`
    }));
    console.table(res);

    showAddRole(departments);
});
}

function showAddRole(departments) {
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
            choices: departments
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
    var query = `SELECT id, title from employees_db.roles`;
    connection.query(query, (err, res) => {
        if(err) throw err;

        const employeeRoles = res.map(({ id, title }) => ({
            value: id, name: `${title}`
        }));

        console.table(res);

        employeeAdd(employeeRoles);
    });
}

function employeeAdd(employeeRoles) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is employees last name?'
        },
        {
            type: 'list',
            name: 'roleChoices',
            message: 'What is their role?',
            choices: employeeRoles
        },
    ]).then((answers) => {
        var query = `INSERT INTO employee SET ?`;
        connection.query(query, {
            first_name: answers.firstName,
            last_name: answers.lastName,
            roles_id: answers.roleChoices,
        },
        function(err, res) {
            if(err) throw err;

            console.table(res);
            console.log('Employee added successfully!');

            startApp()
        })
    });
}

function updateEmployeeRole() {
 startEmployeeChoices();
}

function startEmployeeChoices() {
    var query = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.departments_name AS department
FROM employee
JOIN roles ON employee.roles_id = roles.id
JOIN department ON department.id = roles.departments_id `;

connection.query(query, (err, res) => {
    if(err) throw err;

    const chooseEmployee = res.map(({ id, first_name, last_name, }) => ({
        value: id, name: `${first_name} ${last_name}`
    }));
    console.table(res)
    console.log("Here are the current employees.")

    roleChoice(chooseEmployee);
});
}

function roleChoice(chooseEmployee) {
    var query = `SELECT id, title from employees_db.roles`;

    connection.query(query, (err, res) => {
        if(err) throw err;

        const chooseRoles = res.map(({ id, title }) => ({
            value: id, name: `${title}`
        }));

        console.table(res);
        console.log("Here are the current roles.");

        whoTOUpdate(chooseRoles, chooseEmployee);
    });
}

function whoTOUpdate(chooseRoles, chooseEmployee) {
    inquirer.prompt([ 
        {
            type: 'list',
            name: 'employeeChoice',
            message: 'Which employees role do you want to update?',
            choices: chooseEmployee
        },
        {
            type: 'list',
            name: 'roleChoice',
            message: 'What is their new role?',
            choices: chooseRoles
        },
    ]).then((answers) => {
        var query = `UPDATE employee SET roles_id = ? WHERE id = ?`;
        connection.query(query, [
            answers.roleChoice,
            answers.employeeChoice
        ], (err, res) => {
            if(err) throw err; 

            console.table(res);
            console.log('Employee updated successfully!');
            startApp();
        });
    });
}