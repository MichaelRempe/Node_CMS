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
let endConnection = () => {
    connection.end();
}

//CRUD OPERATIONS

//Views
let view = (table) => {
    //Format input to match table names
    table = table.toLowerCase();
    table = table.substring(0, table.length - 1);

    let query = connection.query(
        "SELECT * FROM " + table,
        (err, res) => {
            if (err) throw err;
            switch (table) {
                case table = "department":
                    console.log("----- Departments -----")
                    for (let i = 0; i < res.length; i++) {
                        console.log(`Department ID: ${res[i].dep_id} || Department Name: ${res[i].name}`);
                    }
                    break;
                case table = "role":
                    console.log("----- Roles -----")
                    for (let i = 0; i < res.length; i++) {
                        console.log(`Role ID: ${res[i].role_id} || Role Title: ${res[i].title} || Salary: ${res[i].salary} || Department: ${res[i].dep_id}`);
                    }
                    break;
                case table = "employee":
                    console.log("----- Employees -----")
                    for (let i = 0; i < res.length; i++) {
                        console.log(`Employee ID: ${res[i].employee_id} || Employee Name: ${res[i].first_name} ${res[i].last_name} || Role ID: ${res[i].role_id}`);
                    }
                    break;
                default:
                    console.log("An Error occurred, hit ctrl^C to escape");
            }
        }

    );
}
//Add
let addDepartment = () => {

}
let addRole = () => {

}
let addEmployee = () => {

}

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
let getRoles = () => {
    let roles = [];
    let query = connection.query(
        "SELECT title, role_id FROM role",
        (err, res) =>{
            if(err)throw err;
            for(let i=0; i<res.length; i++){
               roles.push(`${res[i].title} -ID: ${res[i].role_id}`); 
            }
        }
    )
    return roles;
}
let getDepartments = () => {
    let departments = [];
    let query = connection.query(
        "SELECT name, dep_id FROM department",
        (err, res) =>{
            if(err)throw err;
            for(let i=0; i<res.length; i++){
               departments.push(`${res[i].name} -ID: ${res[i].dep_id}`); 
            }
        }
    )
    return departments;
}
//EXPORT OPERATIONS
module.exports = {
    endConnection: endConnection,
    getEmployees: getEmployees,
    getRoles: getRoles,
    getDepartments: getDepartments,
    view: view,

}