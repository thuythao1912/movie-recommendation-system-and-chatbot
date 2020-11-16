import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[0]

from flask import Flask, jsonify, request
from app.model.intent_recognizer import IntentRecognizer
from app.model.train import Train
from app.model.db_connector import Messages

import utils.utils as utils

from datetime import datetime

app = Flask(__name__)

"""Format message
{"input" : "what is your name",
 "created_time": "123456789",
 "session" : "abcdef",
 "user" : "Thao"}
"""
ir = IntentRecognizer()
messages = Messages()
MAX_TIME = 300


@app.route('/predict', methods=['POST'])
def predict_run():
    try:
        message = request.get_json()
        input = message.get("input")
        session = message.get("session")
        created_time = message.get("created_time")
        user = message.get("user")
        prev_mess = messages.get_last_record({"session": session})

        if prev_mess == {}:
            output = ir.run(input)
        else:
            time = (datetime.strptime(created_time, '%d-%m-%Y %H:%M:%S') - datetime.strptime(prev_mess["created_time"],
                                                                                             '%d-%m-%Y %H:%M:%S')).total_seconds()
            if prev_mess["description"] == "suggest" and time < MAX_TIME:
                output = ir.run_with_history(input)
            else:
                output = ir.run(input)

        output["created_time"] = created_time
        output["session"] = session
        output["user"] = user

        print(f"Q: {input}")
        print(f"A: {output}")

        messages.insert_one(output)
        print("------------------")
        output["_id"] = str(output["_id"])
        return jsonify(output)
    except:
        output = {"input": "", "intent_name": "", "response": "Đã có lỗi xảy ra. Vui lòng thử lại!", "score": 0,
                  "entities": [], "condition": "{}", "description": "", "status": "unhandled",
                  "created_time": str(datetime.now()),
                  "session": "", "user": ""}
        messages.insert_one(output)
        print("------------------")
        output["_id"] = str(output["_id"])
        return jsonify(output)


@app.route('/train', methods=['POST'])
def train():
    try:
        data = request.get_json()
        intents = data.get("data")
        if intents is not None:
            utils.save_json(data=intents, prefix=True,
                            json_path=os.path.join(root, "data", "intent_training.json"))
            train = Train()
            train.run(os.path.join(root, "data", "intent_training.json"))

            ir.__init__()
            return jsonify({"message": "Train model thành công!", "message_status": "success"})

        return jsonify({"message": "Dữ liệu train không phù hợp!", "message_status": "fail"})
    except Exception as err:
        print(err)
        return jsonify({"message": "Train model thất bại!", "message_status": "fail"})

if __name__ == "__main__":
    app.run()
