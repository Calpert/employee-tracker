const connection = require('./connection')

class DB{

    constructor(connection){
        this.connection = connection

    }
    createEmployee(employee){
        return this.connection.query('INSERT INTO employee SET ?', employee)
    }
    findAllEmployees(){
        return this.connection.query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee on manager.id = employee.manager_id;'
        )
    }
}
module.exports = new DB(connection)

//make queries that will run in sql 