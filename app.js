let inquirer = require("inquirer");
let CRUD = require("./db_CRUD");

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
                console.log("1")
                break;
            case resp.choice = "Role":
                console.log("2")
                break;
            case resp.choice = "Employee":
                console.log("3")
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
        if(resp.choice === "Return"){
            start();
        }else{
            //NEEDS TO BE ASYNC AWAIT BEFORE RETURNING TO INITIAL OPTION LIST
            CRUD.view(resp.choice);
            start();
        }
        // switch (resp.choice) {
        //     case resp.choice = "Departments":
        //         console.log("1")
        //         break;
        //     case resp.choice = "Roles":
        //         console.log("2")
        //         break;
        //     case resp.choice = "Employees":
        //         console.log("3")
        //         break;
        //     case resp.choice = "Return":
        //         start();
        //         break;
        //     default:
        //         console.log("Error occurred, please try again or enter: ctrl^c to exit.");
        // }
    });
};
let EXIT = () => {
    CRUD.endConnection();
    console.log(" ------------- Exiting CMS ------------- ")
};

// CRUD INQUIRIES

let addEmployee = () => { };
let addRole = () => { };
let addDepartment = () => { };

let viewByDepartment = () => {

};
let viewByRole = () => { };
let viewEmployees = () => { };

//ASYNC FUNCTIONS
let getEmployees = async () => {
    let employees = await CRUD.getEmployees();
    console.log(employees);
}
main();