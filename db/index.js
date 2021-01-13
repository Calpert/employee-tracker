const connection = require('./connection')

class DB{

    constructor(connection){
        this.connection = connection

    }
    createEmployee(employee){
        return this.connection.query('INSERT INTO employee SET ?', employee);
    }
    findAllEmployees(){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }
    removeEmployee(employeeId){
        return this.connection.query('DELETE FROM employee WHERE id = ?', employeeId);
    }
    findAllRoles(){
        return this.connection.query('SELECT role.id, role.title AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;')
    }
    createRole(role){
        return this.connection.query('INSERT INTO role SET ?', role);
    }
    removeRole(roleId){
        return this.connection.query('DELETE FROM role WHERE id = ?', roleId);
    }
    createDepartment(department){
        return this.connection.query('INSERT INTO department SET ?', department);
    }
    removeDepartment(departmentId){
        return this.connection.query('DELETE FROM department WHERE id = ?', departmentId);
    }
    findAllDepartments(){
        return this.connection.query('SELECT department.id, department.name, SUM (role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name')
    }
    updateEmployeeRole(employeeId, roleId){
        return this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId])

    }
}
module.exports = new DB(connection)

