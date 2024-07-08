from flask import Flask, render_template, request
import math

app = Flask(__name__)

history = []
memory = 0  # Persistent memory

@app.route('/')
def index():
    return render_template('index.html', history=history, memory=memory)

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        operation = request.form['operation']
        result = 0
        error = None

        global memory

        if operation in ['sin', 'cos', 'tan', 'sqrt', 'log', 'exp', 'factorial', 'mem_recall']:
            num1 = float(request.form['num1'])
            if operation == 'sin':
                result = math.sin(num1)
            elif operation == 'cos':
                result = math.cos(num1)
            elif operation == 'tan':
                result = math.tan(num1)
            elif operation == 'sqrt':
                if num1 >= 0:
                    result = math.sqrt(num1)
                else:
                    error = 'Square root of a negative number'
            elif operation == 'log':
                num2 = float(request.form['num2'])
                if num1 > 0 and num2 > 0:
                    result = math.log(num1, num2)
                else:
                    error = 'Logarithm error'
            elif operation == 'exp':
                result = math.exp(num1)
            elif operation == 'factorial':
                if num1 >= 0:
                    result = math.factorial(int(num1))
                else:
                    error = 'Factorial of a negative number'
            elif operation == 'mem_recall':
                result = memory

            if error is None:
                if operation in ['sin', 'cos', 'tan', 'sqrt', 'log', 'exp', 'factorial']:
                    history.append(f"{operation.upper()}({num1}) = {result}")
                elif operation == 'mem_recall':
                    history.append(f"Memory recalled: {memory}")
                else:
                    history.append(f"{num1} {operation} = {result}")
            else:
                history.append(f"{operation.upper()}({num1}) = Error: {error}")

        elif operation in ['add', 'subtract', 'multiply', 'divide', 'mod', 'pow', 'mem_store']:
            num1 = float(request.form['num1'])
            num2 = float(request.form['num2'])

            if operation == 'add':
                result = num1 + num2
            elif operation == 'subtract':
                result = num1 - num2
            elif operation == 'multiply':
                result = num1 * num2
            elif operation == 'divide':
                if num2 != 0:
                    result = num1 / num2
                else:
                    error = 'Division by zero error'
            elif operation == 'pow':
                result = math.pow(num1, num2)
            elif operation == 'mod':
                if num2 != 0:
                    result = num1 % num2
                else:
                    error = 'Modulus by zero error'
            elif operation == 'mem_store':
                memory = num1
                result = memory

            if error is None:
                if operation in ['add', 'subtract', 'multiply', 'divide', 'pow', 'mod']:
                    history.append(f"{num1} {operation} {num2} = {result}")
                elif operation == 'mem_store':
                    history.append(f"Memory stored: {memory}")
            else:
                history.append(f"{num1} {operation} {num2} = Error: {error}")

        else:
            error_message = 'Invalid operation selected.'
            return render_template('index.html', error=error_message, history=history, memory=memory)

        return render_template('index.html', result=result, history=history, memory=memory)

    except ValueError:
        error_message = 'Invalid input. Please enter valid numbers.'
        return render_template('index.html', error=error_message, history=history, memory=memory)

@app.route('/clear_history')
def clear_history():
    history.clear()
    return render_template('index.html', history=history, memory=memory)

if __name__ == '__main__':
    app.run(debug=True)
