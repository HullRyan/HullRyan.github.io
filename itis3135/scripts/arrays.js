var person = ['Ryan Hull', 'Johnny Depp', 'Jennifer Lawrence'];
var salaries = [24000, 316000, 821500];

function addSalary()
{
    var employee = validateEntry();
    var salary = validateSalary();

    console.log(salary, employee);
    initiateSelect();
    initiateTable();
}

function displayResults()
{
    console.log(salaries.length);
    console.log(salaries);
    var avgSalary = 0;
    var maxSalary = Math.max(...salaries);
    for (i = 0; i < salaries.length; i++) 
    {
        console.log(salaries[i]);
        avgSalary += salaries[i];
    }
    avgSalary /= salaries.length;
    avgSalary = (Math.round(avgSalary * 100) / 100);
    
    console.log(avgSalary);
    console.log(maxSalary);

    document.getElementById("results").innerHTML = 
        "<h2>Results</h2></br><p>Average Salary: $" + avgSalary +
        "</p></br><p>Highest Salary: $" + maxSalary + "</p>";
}

function displaySalary()
{
    //Not necessary given I updated the methods to automatically update the innerhtml on each change
} 

function validateSalary() 
{
    var salary;
    while(salary = prompt('Please Enter Salary for Employee: ')) 
    {
        if (isNaN(salary) || parseInt(salary) <= 0)
        {
            alert("Invalid Salary");
        } 
        else 
        {
            salary = parseInt(salary);
            salaries.push(salary);
            return;
        }
    }
}

function validateEntry()
{
    var employee;
    while(employee = prompt('Please Enter Name for Employee: ')) 
    {
        if (!employee)
        {
            alert("Invalid Name");
        } 
        else 
        {
            person.push(employee);
            return;
        }
    }
}

function initiateSelect()
{
    var select = document.getElementById("employees");
    select.innerHTML = '';
    for (i = 0; i < person.length; i++)
    {
        var option = document.createElement("option");
        option.value = i;
        option.text = person[i];
        select.appendChild(option);
    }
}

function initiateTable()
{
    var table = document.getElementById("employee-table");
    table.innerHTML = 
    "<thead><tr><th>Name</th><th>Salary</th></tr></thead><tbody>";
    for (i = 0; i < person.length; i++)
    {
        var row = "<tr><td>" + person[i] + "</td><td>" + salaries[i] + "</td></tr>";
        table.innerHTML += row;
    }
    table.innerHTML += "</tbody>";
}

function initiate()
{
    initiateSelect();
    initiateTable();
}