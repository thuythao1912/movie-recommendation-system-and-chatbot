import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[1]

from flask import Flask, jsonify, request
from app.model.intent_recognizer import IntentRecognizer

app = Flask(__name__)

"""Format message
{"input" : "what is your name",
 "created_time": "123456789"}
"""
ir = IntentRecognizer()

@app.route('/predict', methods=['POST'])
def predict_run():
    message = request.get_json()
    input = message.get("input")
    output = ir.run(input)
    output["created_time"] = message.get("created_time")

    print(f"Q: {input}")
    print(f"A: {output}")
    print("------------------")
    return jsonify(output)


if __name__ == "__main__":
    app.run()
