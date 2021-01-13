const {prompt} = require('inquirer')
const db = require('./db')
const { removeEmployee, removeRole } = require('./db')
const { listenerCount } = require('./db/connection')
require('console.table')
init()
function init(){
    loadmainprompts()
}


async function loadmainprompts(){
    const {choice} = await prompt([
        {
            type:'list',
            name: 'choice',
            message: 'what would you like to do?',
            choices: [
                {
                    name:'view all employees', 
                    value:'VIEW_EMPLOYEES'
                },
                {
                    name:'add employee',
                    value:'ADD_EMPLOYEE'
                },
                {
                    name: 'remove employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'view all roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'create a role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'remove a role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'remove a department',
                    value: 'REMOVE_DEPARTMENT'
                },
                {
                    name: 'view a department',
                    value: 'VIEW_DEPARTMENT'
                },
                {
                    name: 'add a department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'update an employee role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                }
            ]
        }
    ])
    switch(choice){
        case 'VIEW_EMPLOYEES':
            return viewEmployees();
        case 'ADD_EMPLOYEE':
            return addEmployee();
        case 'REMOVE_EMPLOYEE':
            return removeEmployee();
        case 'VIEW_ROLES':
            return viewRoles();
        case 'REMOVE_ROLE':
            return removeRole();
        case 'ADD_ROLE':
            return addRole();
        case 'VIEW_DEPARTMENTS':
            return viewDeparments();
        case 'ADD_DEPARTMENTS':
            return addDeparments();
        case 'REMOVE_DEPARTMENTS':
            return removeDepartment();
        case 'UPDATE_EMPLOYEE_ROLE':
                return updateEmployeeRole();
        default:
            return quit();
    }
}
async function viewEmployees(){
    const employees = await db.findAllEmployees()
    console.table(employees)
    loadmainprompts()
}
async function addEmployee(){
    const roles = await db.findAllRoles()
    const employees = await db.findAllEmployees()
    const employee = await prompt([
        {
            name:'first_name',
            message: 'what is employees first name?',
        },
        {
            name:'last_name',
            message: 'what is employees last name?',
        }
    ])
    const roleChoices = roles.map(({id,title})=> ({
        name:title,
        value:id,
    }))
    const {roleId} = await prompt({
        type:'list',
        name: 'roleId',
        message: 'what is the employees role?',
        choices: roleChoices
    })
    employee.role_id = roleId
    const managerChoices = employees.map(({id, first_name, last_name})=> ({
        name:`${first_name} ${last_name}`,
        value:id,
    }))
    managerChoices.unshift({name:'none', value:null})
    const {managerId} = await prompt({
        type:'list',
        name: 'managerId',
        message: 'what is the employees manager?',
        choices: managerChoices
    })
    employee.manager_id = managerId
    loadmainprompts()
}
async function removeEmployee(){
    const employee = await db.findAllEmployees()
    const employeeChoices = employee.map(({id, first_name, last_name})=> ({
        name: `${first_name} ${last_name}`,
        value: id,
    }))
    const{employeeId} = await prompt([{
        type: 'list',
        message: 'what employee do you want to remove?',
        name: 'employeeId',
        choices: employeeChoices
    }])
    await db.removeEmployee(employeeId)
    loadmainprompts()
}
async function viewRoles(){
    const roles = await db.findAllRoles()
    console.table(roles)
    loadmainprompts()
}
async function addRole(){
    const departments = await db.findAllDepartments()
    const departmentChoices = department.map(({id, name})=> ({
        name: name,
        value: id,
    }))
    const role = await prompt([
        {
        name: 'title',
        message: 'what is the name of the role?'
        },
        {
        name: 'salary',
        message: 'what is the salary of the role?'
        },
        {
        type: 'list',
        message: 'which department does this role belong to?',
        name: 'departmentId',
        choices: departmentChoices
    }])
    await db.createRole(role)
}
async function removeRole(){
    const roles = await db.findAllRoles()
    const roleChoices = roles.map(({id, name})=> ({
        name: name,
        value: id,
    }))
    const{roleId} = await prompt([{
        type: 'list',
        message: 'what role do you want to remove?',
        name: 'roleId',
        choices: roleChoices
    }])
    await db.removeRole(roleId)
    loadmainprompts()
}
async function viewDeparments(){
    const departments = await db.findAllDepartments()
    console.table(departments)
    loadmainprompts()
}
async function addDepartment(){
    const department = await prompt([{
        name: 'name',
        message: 'what is the name of the department?'
    }])
    await db.createDepartment(department)
    loadmainprompts()
}
async function removeDepartment(){
    const departments = await db.findAllDepartments()
    const departmentChoices = departments.map(({id, name})=> ({
        name: name,
        value: id,
    }))
    const{departmentId} = await prompt([{
        type: 'list',
        message: 'what department do you want to remove?',
        name: 'departmentId',
        choices: departmentChoices
    }])
    await db.removeDepartment(departmentId)
    loadmainprompts()
}
async function updateEmployeeRole(){
    const employee = await db.findAllEmployees()
    const employeeChoices = employee.map(({id, first_name, last_name})=> ({
        name: `${first_name} ${last_name}`,
        value: id,
    }))
    const{employeeId} = await prompt([{
        type: 'list',
        message: 'what employee role do you want to update?',
        name: 'employeeId',
        choices: employeeChoices
    }])
    const roles = await db.findAllRoles()
    const roleChoices = roles.map(({id, name})=> ({
        name: name,
        value: id,
    }))
    const{roleId} = await prompt([{
        type: 'list',
        message: 'what role do you want to assign the employee?',
        name: 'roleId',
        choices: roleChoices
    }])
    await db.updateEmployeeRole(employeeId, roleId)
    loadmainprompts()
}



function quit(){
    process.exit()
}