const mysql = require('mysql')
const util = requre('util')

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'

})

connection.connect()
connection.query = util.promisify(connection.query)

module.exports = connection