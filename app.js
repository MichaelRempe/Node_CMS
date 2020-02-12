let inquirer = require("inquirer");
let sql = require("mysql");
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
    main();
    // console.log("connected as id " + connection.threadId);
});
let endConnection = () => {
    connection.end();
}


let main = () => {
    console.log("--------- Content Management System----------\n          ----- Version 1.0.0 -----     ")
    start();
}
// INITIAL DATABASE CHOICES
let start = () => {
    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: ["ADD to Database", "MODIFY Database", "VIEW Database", "EXIT"],
            name: "choice"
        }
    ]).then((resp) => {
        switch (resp.choice) {
            case resp.choice = "ADD to Database":
                ADD();
                break;
            case resp.choice = "MODIFY Database":
                MODIFY();
                break;
            case resp.choice = "VIEW Database":
                VIEW();
                break;
            case resp.choice = "EXIT":
                EXIT();
                break;
            default:
                console.log("Error occurred, please try again or enter: ctrl^c to exit.")
        }
    })
};
//  DATABASE OPERATION CHOICES
let ADD = () => {
    inquirer.prompt([
        {
            message: "What would you like to add?",
            type: "list",
            choices: ["Department", "Role", "Employee", "Return"],
            name: "choice"
        }
    ]).then((resp) => {
        switch (resp.choice) {
            case resp.choice = "Department":
                addDepartment();
                break;
            case resp.choice = "Role":
                addRole();
                break;
            case resp.choice = "Employee":
                addEmployee();
                break;
            case resp.choice = "Return":
                start();
                break;
            default:
                console.log("Error occurred, please try again or enter: ctrl^c to exit.");
        }
    });
};
let MODIFY = () => {
    console.log("Feature coming soon =) 2/11/20")
    start();
    // inquirer.prompt([
    //     {
    //         message: "Which Employee would you like to update?",
    //         type:list,
    //         choices: ["Dan","Erik" ,"Gary", "Brendan", "Michael", "May", "Jon"], //Temporary hard coding until I workout ASYNC/AWAIT to have this dat updated at all times
    //         name: "employee" 
    //     },
    //     {
    //         message:"Provide Employee's new role",
    //         type:"list",
    //         choices: [],//Again ASYNC/AWAIT role table data
    //         name: "newRole"
    //     },
    //     {
    //         message:"OPTIONAL: Indicate Employee's new manager's ID",
    //         type: list,
    //         choices: [], // ASYNC AWAIT select name from employees where manager_id = 0;
    //         name: "newManagerID"
    //     }
    // ]).then((res)=>{
    //     connection.query("UPDATE employee SET ? ? WHERE ?",[
    //         {role_id : res.newRole[0]},
    //         {manager_id : res.newManagerID[0]},
    //         {employee_id: res.employee[0]}
    //     ], (err)=>{
    //         if(err)throw err;
    //         console.log("Database Update successful!");
    //         start();
    //     })
    // })
};
let VIEW = () => {
    inquirer.prompt([
        {
            message: "What would you like to view?",
            type: "list",
            choices: ["Departments", "Roles", "Employees", "Return"],
            name: "choice"
        }
    ]).then((resp) => {
        if (resp.choice === "Return") {
            start();
        } else {
            view(resp.choice);
        }
    });
};
let EXIT = () => {
    endConnection();
    console.log(" ------------- Exiting CMS ------------- ")
};

// CRUD INQUIRIES
let addEmployee = () => {
    inquirer.prompt([
        {
            message: "Provide Employee's First Name",
            type: "input",
            name: "first_name"
        },
        {
            message: "Provide Employee's Last Name",
            type: "input",
            name: "last_name"
        },
        {
            message: "Select Employee's Role",
            type: "list",
            choices: ["Sales Manager", "Sales Rep", "Full Stack Dev", "Front End Dev", "Back End Dev", "Legal Manager", "Legal Rep"],
            name: "role"
        },//{
        //     message: "OPTIONAL: Provide Employee's Manager id",
        //     type: "input",
        //     name: "managerID"
        // }
    ]).then((res) => {
        newEmployee(res);
        start();
    })
};
let addRole = () => {
    inquirer.prompt([
        {
            message: "Please indicate the title of the position you wish to add:",
            type: "input",
            name: "title"
        },
        {
            message: "Please indicate the salary of the position you wish to add:",
            type: "input",
            name: "salary"
        },
        {
            message: "Which department does this position belong to?:",
            type: "list",
            choices: ["Sales", "Engineering", "Legal"], //GET CHOICES
            name: "department_id"
        },
    ]).then((res) => {
        newRole(res);
        start();
    })
};
let addDepartment = () => {
    inquirer.prompt([
        {
            message: "Enter new department name:",
            type: "input",
            name: "name"
        }
    ]).then((res) => {
        newDepartment(res);
        console.log("\n")
        start();
    })
};


//CRUD FUNCTIONS
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
                    console.log("----- Departments -----\n");
                    for (let i = 0; i < res.length; i++) {
                        console.log(`Department ID: ${res[i].dep_id} || Department Name: ${res[i].name}`);
                    }
                    start();
                    break;
                case table = "role":
                    console.log("----- Roles ----- \n");
                    for (let i = 0; i < res.length; i++) {
                        console.log(`Role ID: ${res[i].role_id} || Role Title: ${res[i].title} || Salary: ${res[i].salary} || Department: ${res[i].dep_id}`);
                    }
                    start();
                    break;
                case table = "employee":
                    console.log("----- Employees -----");
                    for (let i = 0; i < res.length; i++) {
                        console.log(`Employee ID: ${res[i].employee_id} || Employee Name: ${res[i].first_name} ${res[i].last_name} || Role ID: ${res[i].role_id}`);
                    }
                    start();
                    break;
                default:
                    console.log("An Error occurred, please contact your DBA");
                    start();
            }
        }

    );
}
let newEmployee = (input) => {
    let query = connection.query("INSERT INTO employee SET ?", {
        first_name: input.firstName,
        last_name: input.lastName,
        role_id: input.role[0]
    });
    console.log("Employee Added!")
}
let newRole = (input) => {
    let query = connection.query("INSERT INTO role SET ?", {
        tile: input.title,
        salary: input.salary
    });
    console.log("Role Added!")
}
let newDepartment = (input) => {
    let query = connection.query("INSERT INTO department SET ?", {
        name: input.name,
    });
    console.log("Department Added!");
}