const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employees = [];

const askQuestions = () => {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {       
            type: "input",
            name: "id",
            message: "What is your id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "list",
            name: "role",
            message: "What is your role?",
            choices:[
                "Engineer",
                "Intern",
                "Manager"
            ] 
        },
        {
            type: "input",
            name: "github",
            message: "What is your github username?",
            when: function (askQuestions) {
                return askQuestions.role == "Engineer"
            }
        },
        {
            type: "input",
            name: "school",
            message: "What college do you go to?",
            when: function (askQuestions) {
                return askQuestions.role == "Intern"
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?",
            when: function (askQuestions) {
                return askQuestions.role == "Manager"
            }
        },
        {
            type: "list",
            name: "anotherEmployee",
            message: "Would you like to add another employee to your team?",
            choices:[
                "Yes",
                "No"
            ]
        }
    ])

    .then(answers => {
        // If I were to refactor, would use a switch function because in hindsight it would be cleaner
        if (answers.role === "Engineer"){
            const engineer = new Engineer (answers.name, answers.id, answers.email, answers.github)
            employees.push(engineer);
            console.log(employees);
            if(answers.anotherEmployee === "Yes"){
                askQuestions();
            }
            else{
                let renderHTML = render(employees);
                writeHTML(renderHTML);
            }
        }

        if (answers.role === "Intern"){
            const intern = new Intern (answers.name, answers.id, answers.email, answers.school)
            employees.push(intern);
            console.log(employees);
            if(answers.anotherEmployee === "Yes"){
                askQuestions();
            }
            else{
                let renderHTML = render(employees);
                writeHTML(renderHTML);
            }
        }

        if (answers.role === "Manager"){
            const manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber)
            employees.push(manager);
            console.log(employees);
            if(answers.anotherEmployee === "Yes"){
                askQuestions();
            }
            else{
                let renderHTML = render(employees);
                writeHTML(renderHTML);
            }
        }
    });
}

const writeHTML = (renderHTML) => {
    fs.writeFile('team.html', renderHTML, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log ("The file was created!")
    });
};

askQuestions();