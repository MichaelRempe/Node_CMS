let sql = require("mysql");
let async = require("async");
//Database connection
let connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Blizzard_12",
    database: "company_db"
});
//Establish/Withdrawal connection
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});
let endConnection = ()=>{
    connection.end();
}

//CRUD OPERATIONS
let getEmployees = () => {
    let employees = [];
    let query = connection.query(
        "SELECT first_name, last_name FROM employee",
        (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                employees.push(`${res[i].first_name} ${res[i].last_name}`);
            }
        }
    )
    return employees;
}
//EXPORT OPERATIONS
module.exports = {
    endConnection : endConnection,
    getEmployees : getEmployees,
}