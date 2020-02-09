DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE department(
    dep_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    -- primary key --
    PRIMARY KEY (dep_id)
);
CREATE TABLE role(
    role_id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8) NOT NUll,
    dep_id INTEGER NOT NULL,
    
    -- secondary keys --
    FOREIGN KEY (dep_id) REFERENCES department(dep_id),
    -- primary key --
    PRIMARY KEY(role_id)
);
CREATE TABLE employee(
    employee_id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    
    -- secondary keys --
    FOREIGN KEY (role_id) REFERENCES role (role_id),
    manager_id INTEGER DEFAULT 0 REFERENCES employee(employee_id),
    -- primary key -- 
    PRIMARY KEY(employee_id)
);



INSERT INTO department(name)
VAlUE ("Sales"),("Engineering"),("Legal");

INSERT INTO role(title, salary, dep_id)
VAlUE("Sales Manager", 80000.00, 1),
("Sales Rep", 60000.00, 1),
("Full Stack", 85000.00, 2),
("Front End", 70000.00, 2),
("Back End", 75000.00, 2),
("Legal Manager", 90000.00, 3),
("Legal Rep", 80000.00, 3);

-- SEED MANAGERS --
INSERT INTO employee(first_name, last_name, role_id)
VAlUE("Dan", "Rosenbaum", 1),("Erik", "Hoverstein", 3),("Gary", "Aulmes",6);
-- SEED EMPLOYEES -- 
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE("Brendan","Erickson", 2, 1),("Michael","Rempe",5 ,2),("May","Hitchings", 4, 2),("Jon", "Choi", 7, 3);