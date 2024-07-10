from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    num1 = float(request.form['num1'])
    operation = request.form['operation']
    result = 0.0

    if operation == 'add':
        num2 = float(request.form['num2'])
        result = num1 + num2
    elif operation == 'subtract':
        num2 = float(request.form['num2'])
        result = num1 - num2
    elif operation == 'multiply':
        num2 = float(request.form['num2'])
        result = num1 * num2
    elif operation == 'divide':
        num2 = float(request.form['num2'])
        if num2 != 0:
            result = num1 / num2
        else:
            return jsonify({'result': 'Error: Division by zero!'})
    elif operation == 'sin':
        import math
        result = math.sin(num1)
    elif operation == 'cos':
        import math
        result = math.cos(num1)
    elif operation == 'tan':
        import math
        result = math.tan(num1)
    elif operation == 'pow':
        num2 = float(request.form['num2'])
        result = num1 ** num2
    elif operation == 'sqrt':
        import math
        result = math.sqrt(num1)
    elif operation == 'log':
        import math
        result = math.log2(num1)
    elif operation == 'exp':
        result = 2 ** num1
    elif operation == 'factorial':
        import math
        result = math.factorial(int(num1))
    elif operation == 'mod':
        num2 = float(request.form['num2'])
        result = num1 % num2

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
