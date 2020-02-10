let inquirer = require("inquirer");
let CRUD = require("./db_CRUD");

let employees = [];
let roles = [];
let departments = [];

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
    // let _employees = getEmployees().then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
    getEmployees();
    CRUD.endConnection();

    // .catch((err)=>{console.log(err)})
    // prompt which employee you want to update
    //CRUD update call

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
            //NEEDS TO BE ASYNC AWAIT BEFORE RETURNING TO INITIAL OPTION LIST
            CRUD.view(resp.choice);
            // start();
        }
    });
};
let EXIT = () => {
    CRUD.endConnection();
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
            name: "Last_name"
        },
        {
            message: "Select Employee's Role",
            type: "list",
            choices: ["DUMMY LIST"],//GET LIST
            name: "role"
        }, {
            message: "OPTIONAL: Provide Employee's Manager id",
            type: "input",
            name: "managerID"
        },
    ]).then((res) => {
        console.log(res);
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
            choices: ["DUMMY LIST"], //GET CHOICES
            name: "department_id"
        },
    ]).then((res) => {
        console.log(res);
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
        console.log(res);
    })
};

//ASYNC FUNCTIONS
let getEmployees = async () => {
    employees = await CRUD.getEmployees();
    console.log(employees);
}
let getRoles = async () =>{
    roles = await CRUD.getRoles();
    console.log(roles);
}
let getDepartments = async ()=>{
    departments = await CRUD.getDepartments();
    console.log(departments);
}
// main();

getDepartments();
getRoles();
getEmployees();