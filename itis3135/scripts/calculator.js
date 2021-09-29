var numberString = "";
var previousNumberString = "";
var operator = '';
var repeatedOperation = false;

function updateDisplay() 
{
    document.getElementById("calculator-screen").innerHTML = 
    numberString;
}

function clearScreen() 
{
    console.log("Clear called");
    numberString = "";
    previousNumberString = "";
    updateDisplay();
}

function addNum(num) 
{
    if(numberString == "0")
    {
        numberString = num;
        updateDisplay();
    }
    else if(numberString.length < 15)
    {
        numberString += num;
        updateDisplay();
        repeatedOperation = false;
    }
    else
    {
        numberString = "Number Overload";
        updateDisplay();
        numberString = "";
    }
}

function addDecimal() 
{
    if(numberString.length <= 15 && !numberString.includes('.'))
    {
        numberString += '.';
        updateDisplay();
    }
}

function divide() 
{
    pushString();
    operator = '/';
    repeatedOperation = false;
}

function multiply() 
{
    pushString();
    operator = '*';
    repeatedOperation = false;
}

function subtract() 
{
    pushString();
    operator = '-';
    repeatedOperation = false;
}

function negate() 
{
    if (numberString[0] == '-')
    {
        numberString = numberString.substring(1);
    }
    else
    {
        numberString = '-' + numberString;
    }
    updateDisplay();
}

function compute() 
{
    if (repeatedOperation) 
    {
        repeatedOperation = true;
        switch(operator)
        {
            case '+':
                numberString = (parseFloat(numberString) + parseFloat(previousNumberString)).toString();
                break;
            case '-':
                numberString = (parseFloat(numberString) - parseFloat(previousNumberString)).toString();
                break;
            case '*':
                numberString = ((parseFloat(previousNumberString) * parseFloat(numberString)).toFixed(3)).toString();
                break;
            case '/':
                numberString = ((parseFloat(previousNumberString) / parseFloat(numberString)).toFixed(3)).toString();
                break;
            case '':
                break;
        }
        updateDisplay();    
    }
    else 
    {
        repeatedOperation = true;
        let tempString = numberString;
        switch(operator)
        {
            case '+':
                numberString = (parseFloat(numberString) + parseFloat(previousNumberString)).toString();
                break;
            case '-':
                numberString = (parseFloat(previousNumberString) - parseFloat(numberString)).toString();
                break;
            case '*':
                numberString = ((parseFloat(previousNumberString) * parseFloat(numberString)).toFixed(3)).toString();
                break;
            case '/':
                numberString = ((parseFloat(previousNumberString) / parseFloat(numberString)).toFixed(3)).toString();
                break;
            case '':
                return;
                break;
        }
        previousNumberString = tempString;
        updateDisplay();
    }
}

function addition() 
{
    pushString();
    operator = '+';
    console.log(operator);
    console.log(numberString);
    console.log(previousNumberString);
}

function pushString() 
{
    if (!numberString=="")
    {
        previousNumberString = numberString;
        numberString = '';
    }
}
