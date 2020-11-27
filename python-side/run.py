import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[0]

from flask import Flask, jsonify, request
from app.model.intent_recognizer import IntentRecognizer
from app.model.suggestor import Suggestor
from app.model.train import Train
from app.model.db_connector import Messages

import utils.utils as utils

from datetime import datetime

app = Flask(__name__)

"""Format message
{"input" : "toy story",
 "created_time": "17-11-2020 09:58:00",
 "session":"bntt",
 "user":{
        "username": "Thao",
        "user_id": "1",
        "user_login": "bntt",
        "color":"blue"
 }            
}
"""
ir = IntentRecognizer()
suggestor = Suggestor()
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
            output = ir.run(input, user["user_id"])
        else:
            time = (datetime.strptime(created_time, '%d-%m-%Y %H:%M:%S') - datetime.strptime(prev_mess["created_time"],
                                                                                             '%d-%m-%Y %H:%M:%S')).total_seconds()
            if prev_mess["description"] in ["suggest"] and time < MAX_TIME:
                output = ir.run_with_history(input)
            else:
                output = ir.run(input, user["user_id"])

        output["created_time"] = created_time
        output["session"] = session
        output["user"] = user

        print(f"Q: {input}")
        print(f"A: {output}")

        messages.insert_one(output)
        print("------------------")
        output["_id"] = str(output["_id"])
        return jsonify(output)
    except Exception as err:
        print(err)
        now = datetime.now()
        output = {"input": "", "intent_name": "", "response": "Đã có lỗi xảy ra. Vui lòng thử lại!", "score": 0,
                  "entities": [], "condition": "{}", "description": "", "status": "unhandled",
                  "created_time": now.strftime("%d-%m-%Y %H:%M:%S"),
                  "session": "", "user": "", "sentiment_score": 0}
        messages.insert_one(output)
        print("------------------")
        output["_id"] = str(output["_id"])
        return jsonify(output)


@app.route('/suggest', methods=['POST'])
def suggest_movies():
    try:
        data = request.get_json()
        movies = data.get("data")
        results = suggestor.suggest_movies(movies, chatbot=False)
        for r in results:
            r["_id"] = str(r["_id"])
        return jsonify(results)

    except Exception as err:
        print(err)
        return jsonify({"message": "Lấy danh sách phim gợi ý thất bại!", "message_status": "fail"})



@app.route('/intents', methods=['POST'])
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
            return jsonify({"message": "Train dữ liệu thành công!", "message_status": "success"})

        return jsonify({"message": "Dữ liệu train không phù hợp!", "message_status": "fail"})
    except Exception as err:
        print(err)
        return jsonify({"message": "Train dữ liệu thất bại!", "message_status": "fail"})


@app.route("/entities", methods=["POST"])
def update_entities():
    try:
        data = request.get_json()
        entities = data.get("data")
        if entities is not None:
            utils.save_json(data=entities, prefix=True,
                                                 json_path=os.path.join(root, "data", "entities.json"))
        ir.__init__()
        return jsonify(
            {"message": "Cập nhật entities thành công!", "message_status": "success"})
    except Exception as err:
        print(err)
        return jsonify({"message": "Cập nhật entities thất bại!", "message_status": "fail"})


@app.route("/stop_words", methods=["POST"])
def update_stop_words():
    try:
        data = request.get_json()
        entities = data.get("data")
        if entities is not None:
            utils.save_json(data=entities, prefix=True,
                                                 json_path=os.path.join(root, "data", "stop_words.json"))
        ir.__init__()
        return jsonify(
            {"message": "Cập nhật stop words thành công!", "message_status": "success"})
    except Exception as err:
        print(err)
        return jsonify({"message": "Cập nhật stop words thất bại!", "message_status": "fail"})


@app.route("/negative_words", methods=["POST"])
def update_negative_words():
    try:
        data = request.get_json()
        entities = data.get("data")
        if entities is not None:
            utils.save_json(data=entities, prefix=True,
                                                 json_path=os.path.join(root, "data", "negative_words.json"))
        ir.__init__()
        return jsonify(
            {"message": "Cập nhật stop words thành công!", "message_status": "success"})
    except Exception as err:
        print(err)
        return jsonify({"message": "Cập nhật negative words thất bại!", "message_status": "fail"})


@app.route("/positive_words", methods=["POST"])
def update_positive_words():
    try:
        data = request.get_json()
        entities = data.get("data")
        if entities is not None:
            utils.save_json(data=entities, prefix=True,
                                                 json_path=os.path.join(root, "data", "positive_words.json"))
        ir.__init__()
        return jsonify(
            {"message": "Cập nhật positive words thành công!", "message_status": "success"})
    except Exception as err:
        print(err)
        return jsonify({"message": "Cập nhật positive words thất bại!", "message_status": "fail"})


@app.route("/", methods = ["PUT"])
def update_data():
    ir.__init__()


if __name__ == "__main__":
    app.run()
