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

from app.model.entity_recognizer import EntityRecognizer

MIN_SCORE = 0.7
UNKNOWN_RESPONSE = 'Xin lỗi, bạn có thể cung cấp thêm thông tin không?'
MISSING_RESPONSE = 'Xin lỗi, hiện mình chưa có thông tin về "{}". Mình sẽ cập nhật sớm nhất có thể!'


class IntentRecognizer:
    def __init__(self):
        self.clf = load(os.path.join(root, "app", "model", "model_predicted.joblib"))
        self.intents = None
        self.load_intents()
        self.entity_recognizer = EntityRecognizer()

    def load_intents(self):
        intent_training = utils.load_json(os.path.join(root, "data", "intent_training.json"))["intents"]
        intent_detail = utils.load_json(os.path.join(root, "data", "intent_detail.json"))["intents"]
        intents = []
        intents.extend(intent_detail)
        intents.extend(intent_training)
        self.intents = intents

    def get_response(self, intent_name):
        result = {}
        intent = next((item for item in self.intents if item["intent_name"] == intent_name), None)
        if not intent is None:
            result["response"] = f'{random.choice(intent["responses"])}'
            result["description"] = intent["description"]
        return result

    def run(self, sentence):
        sentence = nlp.preprocess_step_1(sentence)
        sen_result = self.entity_recognizer.detect_entities(sentence)
        sen_recognize = sen_result["sen_result"]
        entities = sen_result["entitites"]
        data_predict = [{"feature": sen_recognize}]
        df_predict = pd.DataFrame(data_predict)

        # predict
        intent_predicted = self.clf.predict(df_predict["feature"])

        # Get response
        score = max(self.clf.predict_proba(df_predict["feature"])[0])

        output = {"input": sentence, "intent_name": "", "response": "", "score": score}
        if score < MIN_SCORE:
            output["response"]  = UNKNOWN_RESPONSE
        else:
            name_predicted = intent_predicted[0]
            print(name_predicted)
            #replace entity key by its values
            for entity in entities:
                name_predicted = name_predicted.replace(entity["key"], entity["org_val"])
                name_predicted = nlp.remove_accents(name_predicted)
            result = self.get_response(name_predicted)

            #case missing intent_detail
            if len(result) == 0:
                output["response"]  = MISSING_RESPONSE.format(sentence)
            #case existing intent_detail
            else:
                output["response"] = result["response"]
                output["intent_name"] = name_predicted
        # output = {"input": sentence, "intent_name": name_predicted, "response": response, "score": score}
        return output


if __name__ == "__main__":
    sentence = ""
    ir = IntentRecognizer()
    print(ir.intents)
    while sentence != "quit":
        sentence = input("Enter something: ")
        print(ir.run(sentence))
    print("Bye")
