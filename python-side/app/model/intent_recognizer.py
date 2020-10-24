import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import utils.utils as utils
import utils.nlp_utils as nlp
import pandas as pd
import random
from joblib import load


MIN_SCORE = 0.7
UNKNOWN_RESPONSE = "Xin lỗi, bạn có thể cung cấp thêm thông tin không?"


class IntentRecognizer:
    def __init__(self):
        self.clf = load(os.path.join(root, "app", "model", "model_predicted.joblib"))
        self.intents = None
        self.load_intent_detail(os.path.join(root, "data", "intent_training.json"))

    def load_intent_detail(self, intent_detail_path):
        intents = utils.load_json(intent_detail_path)["intents"]
        self.intents = intents

    def get_response(self, intent_name):
        intent = next(item for item in self.intents if item["intent_name"] == intent_name)
        response = f'{random.choice(intent["responses"])}'
        return response

    def run(self, sentence):
        sentence = nlp.preprocess_step_1(sentence)
        data_predict = [{"feature": sentence}]
        df_predict = pd.DataFrame(data_predict)

        # predict
        intent_predicted = self.clf.predict(df_predict["feature"])

        # Get response
        score = max(self.clf.predict_proba(df_predict["feature"])[0])

        if score < MIN_SCORE:
            response = UNKNOWN_RESPONSE
        else:
            response = self.get_response(intent_predicted[0])
        output = {"intent_name": intent_predicted[0], "response": response, "score": score}
        return output


if __name__ == "__main__":
    sentence = ""
    ir = IntentRecognizer()
    print(ir.intents)
    while sentence != "quit":
        sentence = input("Enter something: ")
        ir.run(sentence)
    print("Bye")
