
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const Department = require('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const department = new Department(connection);
const role = new Role(connection);
const employee = new Employee(connection);


async function init() {

  let departments; 
  let roles;

  try {
    const answer = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'Add employee',
        'Update employee role',
        'View all roles',
        'Add role',
        'View all departments',
        'Add department',
        'Exit'
      ]
    });

    switch (answer.action) {
      case 'View all employees':
        await employee.viewAll();
        init(); 
        break;
      case 'Add employee':
        departments = await department.getAllDepartments();
        roles = await role.getAllRoles();
        const managers = await employee.getAllManagers();
        const employeeAnswers = await inquirer.prompt([
          {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name:",
          },
          {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's last name:",
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'Select the role for this employee',
            choices: roles
          },
          {
            type: 'list',
            name: 'manager_id',
            message: 'Choose the manager for this employee',
            choices: managers
          },
        ]);
        const { first_name, last_name, role_id, manager_id } = employeeAnswers;
        await employee.add(first_name, last_name, role_id, manager_id);
        init(); 
        break;
      case 'Update employee role':
        const employees = await employee.getAllEmployees();
        const allRoles = await role.getAllRoles();
        const updateRoleAnswers = await inquirer.prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: "Select the user for whom you'd like to change the role",
            choices: employees
          },
          {
            type: 'list',
            name: 'new_role_id',
            message: 'Select the new role for the employee',
            choices: allRoles
          },
        ]);

        const { employee_id, new_role_id } = updateRoleAnswers;
        await employee.updateRole(employee_id, new_role_id);
        init(); 
        break;
      case 'View all roles':
        await role.viewAll();
        init(); 
        break;
      case 'Add role':
        departments = await department.getAllDepartments();
        const roleAnswers = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the role title:',
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Enter the role salary:',
          },
          {
            type: 'list',
            name: 'department_id',
            message: 'Select the department for this role:',
            choices: departments
          },
        ]);
        const { title, salary, department_id } = roleAnswers;
        await role.add(title, salary, department_id);
        init(); 
        break;
      case 'View all departments':
        await department.viewAll();
        init(); 
        break;
      case 'Add department':
        const departmentNameAnswer = await inquirer.prompt({
          type: 'input',
          name: 'name',
          message: 'Enter the department name:',
        });
        const departmentName = departmentNameAnswer.name;
        await department.add(departmentName);
        init(); 
        break;
      case 'Exit':

        console.log('Goodbye!');
        connection.end();
        return; 
      default:
      
        console.log(`Invalid action: ${answer.action}`);
        init(); 
        break;
    }
  } catch (error) {

    console.error('Error:', error);
    init(); 
  }
}

init();