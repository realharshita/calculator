document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('calculator-form');
    const calculator = document.getElementById('calculator');

    // Calculator form HTML
    calculatorForm.innerHTML = `
        <form action="/calculate" method="post">
            <input type="number" name="num1" placeholder="Enter number 1" step="any" required> <br><br>
            <select name="operation" id="operation" onchange="updateInputs()">
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
                <option value="multiply">Multiply</option>
                <option value="divide">Divide</option>
                <option value="sin">Sin</option>
                <option value="cos">Cos</option>
                <option value="tan">Tan</option>
                <option value="pow">Pow</option>
                <option value="sqrt">Square Root</option>
                <option value="log">Log (base 2)</option>
                <option value="exp">Exponential</option>
                <option value="factorial">Factorial</option>
                <option value="mod">Modulus</option>
                <option value="mem_store">Store in Memory</option>
                <option value="mem_recall">Recall Memory</option>
            </select> <br><br>
            <input type="number" name="num2" id="num2" placeholder="Enter number 2" step="any" style="display:none;"> <br><br>
            <button type="submit">Calculate</button>
            <button type="button" onclick="clearForm()">Clear</button>
        </form>
        <div id="calculator-history">
            <h2>History</h2>
            <ul id="history-list"></ul>
            <form action="/clear_history" method="get">
                <button type="submit">Clear History</button>
            </form>
        </div>
    `;

    // Real calculator HTML
    calculator.innerHTML = `
        <div class="calc-container">
            <div class="calc-screen" id="calc-screen">0</div>
            <div class="calc-keys">
                <div class="calc-key" onclick="pressKey('7')">7</div>
                <div class="calc-key" onclick="pressKey('8')">8</div>
                <div class="calc-key" onclick="pressKey('9')">9</div>
                <div class="calc-key" onclick="pressKey('/')">/</div>
                <div class="calc-key" onclick="pressKey('4')">4</div>
                <div class="calc-key" onclick="pressKey('5')">5</div>
                <div class="calc-key" onclick="pressKey('6')">6</div>
                <div class="calc-key" onclick="pressKey('*')">*</div>
                <div class="calc-key" onclick="pressKey('1')">1</div>
                <div class="calc-key" onclick="pressKey('2')">2</div>
                <div class="calc-key" onclick="pressKey('3')">3</div>
                <div class="calc-key" onclick="pressKey('-')">-</div>
                <div class="calc-key" onclick="pressKey('0')">0</div>
                <div class="calc-key" onclick="pressKey('.')">.</div>
                <div class="calc-key" onclick="pressKey('C')">C</div>
                <div class="calc-key" onclick="pressKey('+')">+</div>
                <div class="calc-key" style="grid-column: span 4;" onclick="calculate()">=</div>
            </div>
        </div>
    `;

    // JavaScript functions
    function updateInputs() {
        var operation = document.getElementById("operation").value;
        var num2Input = document.getElementById("num2");

        if (operation === "add" || operation === "subtract" || operation === "multiply" || operation === "divide" || operation === "mod" || operation === "pow") {
            num2Input.style.display = "inline";
        } else {
            num2Input.style.display = "none";
        }
    }

    function clearForm() {
        document.querySelector("form").reset();
    }
});
