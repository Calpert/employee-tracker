const {prompt} = require('inquirer')
const db = require('./db')
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
            ]
        }
    ])
    switch(choice){
        case 'VIEW_EMPLOYEES':
            return viewEmployees();
        case 'ADD_EMPLOYEE':
            return addEmployee();
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
function quit(){
    process.exit()
}