from flask import Flask, render_template, request

app = Flask(__name__)

history = []

@app.route('/')
def index():
    return render_template('index.html', history=history)

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        num1 = float(request.form['num1'])
        num2 = float(request.form['num2'])
        operation = request.form['operation']
        result = 0
        error = None

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

        if error is None:
            history.append(f"{num1} {operation} {num2} = {result}")
        else:
            history.append(f"{num1} {operation} {num2} = Error: {error}")

        return render_template('index.html', result=result, history=history)

    except ValueError:
        error_message = 'Invalid input. Please enter valid numbers.'
        return render_template('index.html', error=error_message, history=history)

if __name__ == '__main__':
    app.run(debug=True)
