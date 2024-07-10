let num1 = '';
let num2 = '';
let operation = '';
let memory = '';

function appendNumber(number) {
    if (operation === '') {
        num1 += number;
        document.getElementById('display').value = num1;
    } else {
        num2 += number;
        document.getElementById('display').value = num2;
    }
}

function setOperation(op) {
    if (num1 === '') return;
    operation = op;
    document.getElementById('currentCalculation').innerText = num1 + ' ' + operation;
}

function calculate() {
    let result;
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            result = number1 / number2;
            break;
        case 'sqrt':
            result = Math.sqrt(number1);
            break;
        case 'pow':
            result = Math.pow(number1, number2);
            break;
        case 'log':
            result = Math.log2(number1);
            break;
        case 'exp':
            result = Math.pow(2, number1);
            break;
        case 'sin':
            result = Math.sin(number1);
            break;
        case 'cos':
            result = Math.cos(number1);
            break;
        case 'tan':
            result = Math.tan(number1);
            break;
        case 'factorial':
            result = factorial(number1);
            break;
        case 'mod':
            result = number1 % number2;
            break;
        default:
            return;
    }

    document.getElementById('display').value = result;
    num1 = result.toString();
    num2 = '';
    operation = '';
    document.getElementById('currentCalculation').innerText = '';
}

function clearDisplay() {
    num1 = '';
    num2 = '';
    operation = '';
    document.getElementById('display').value = '';
    document.getElementById('currentCalculation').innerText = '';
}

function storeMemory() {
    memory = document.getElementById('display').value;
}

function recallMemory() {
    if (memory !== '') {
        if (operation === '') {
            num1 = memory;
        } else {
            num2 = memory;
        }
        document.getElementById('display').value = memory;
    }
}

function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

function plotFunction() {
    const func = document.getElementById('function').value;

    // Validate that the input is in the form of y = f(x)
    const matches = func.match(/^\s*y\s*=\s*([^=]+)$/);
    if (!matches) {
        alert('Invalid function. Please provide an explicit function in the form of y = f(x).');
        return;
    }

    const expression = matches[1];
    const points = [];

    for (let x = -10; x <= 10; x += 0.1) {
        let y;
        try {
            y = eval(expression.replace(/x/g, `(${x})`));
            if (isNaN(y)) {
                throw new Error('Invalid result');
            }
        } catch (e) {
            console.error('Error evaluating function:', e);
            alert('Invalid function');
            return;
        }
        points.push({ x, y });
    }

    updateGraph(points);
}

function updateGraph(points) {
    const ctx = document.getElementById('graph').getContext('2d');
    const data = {
        datasets: [{
            label: 'Function Plot',
            data: points,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            showLine: true,
            fill: false
        }]
    };

    new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}

function updateGraph(points) {
    const ctx = document.getElementById('graph').getContext('2d');
    const data = {
        datasets: [{
            label: 'Function Plot',
            data: points,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            showLine: true,
            fill: false
        }]
    };

    new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}


const ctx = document.getElementById('graph').getContext('2d');
const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Function Plot',
            data: [],
            showLine: true,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                type: 'linear'
            }
        }
    }
});

function updateGraph(points) {
    chart.data.datasets[0].data = points;
    chart.update();
}
