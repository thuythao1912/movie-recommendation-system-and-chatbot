import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import configparser

config = configparser.ConfigParser()
config.read(os.path.join(root, 'config.ini'))

import utils.utils as utils
import utils.nlp_utils as nlp
import pandas as pd
import random
from joblib import load

from app.model.entity_recognizer import EntityRecognizer
from app.model.train import Train

INTENT_THRESHOLD = float(config["INTENT"]["INTENT_THRESHOLD"])

UNKNOWN_RESPONSE = 'Xin lỗi, bạn có thể cung cấp thêm thông tin không?'
MISSING_RESPONSE = 'Xin lỗi, hiện mình chưa có thông tin về "{}". Mình sẽ cập nhật sớm nhất có thể!'
ENTITIES = ["genre_name", "movie_title"]


class IntentRecognizer:
    def __init__(self):
        self.clf = None
        self.load_model()
        self.intents = None
        self.load_intents()
        self.entity_recognizer = EntityRecognizer()

    def load_model(self):
        try:
            self.clf = load(os.path.join(root, "app", "model", "trained", "model_predicted.pkl"))
        except:
            print("Load model fail => Train model")
            train = Train()
            train.run(os.path.join(root, "data", "intent_training.json"))
            self.load_model()

    def load_intents(self):
        intent_training = utils.load_json(os.path.join(root, "data", "intent_training.json"))["intents"]
        intent_detail = utils.load_json(os.path.join(root, "data", "intent_detail.json"))["intents"]
        intents = []
        intents.extend(intent_detail)
        intents.extend(intent_training)
        self.intents = intents


    def get_response(self, intent_name, entities, signs):
        print("get_res", intent_name)
        entity = ""
        result={}
        intent = next((item for item in self.intents if item["intent_name"] == intent_name), None)
        response = UNKNOWN_RESPONSE
        if not intent is None:
            if intent["description"] != "domain":
                response = f'{random.choice(intent["responses"])}'
            else:
                if len(entities) == 0:
                    response = f'{random.choice(intent["responses"])}'
                else:

                    if intent["query"] != "":
                        for e in ENTITIES:
                            if e in intent_name:
                                entity = e

                        opt = [s["value"] for s in signs if s["entity"] == entity]
                        ent_vals = [{e["key"]: e["org_val"]} for e in entities if e["key"] == entity]
                        condition = {f'${opt[0]}': ent_vals}
                        print(condition)
                        response = intent["query"].format(condition)
        result["response"] = response
        return result


    def run(self, sentence):
        sen_result = self.entity_recognizer.detect_entities(sentence)
        sen_recognize = sen_result["sen_result"]
        sen_recognize = nlp.preprocess_step_2(nlp.preprocess_step_1(sen_recognize))

        sign = sen_result["sign"]
        entities = sen_result["entitites"]
        entities_val = []
        data_predict = [{"feature": sen_recognize}]
        df_predict = pd.DataFrame(data_predict)

        print("==> Sentence to recognize: {}".format(sen_recognize))

        # predict
        intent_predicted = self.clf.predict(df_predict["feature"])
        print("Intent general predicted: {}".format(intent_predicted))

        # Get response
        score = max(self.clf.predict_proba(df_predict["feature"])[0])

        output = {"input": sentence, "intent_name": "", "response": "", "score": score, "entities": entities}
        if score < INTENT_THRESHOLD:
            output["response"] = UNKNOWN_RESPONSE
            output["intent_name"] = intent_predicted[0]
        else:
            name_predicted = intent_predicted[0]
            output["intent_name"] = name_predicted
            # replace entity key by its values
            for entity in entities:
                name_predicted = name_predicted.replace(entity["key"], entity["org_val"])
                name_predicted = nlp.remove_accents(name_predicted)
                entities_val.append(entity["org_val"])
            result = self.get_response(intent_predicted[0], entities, sign)
            print(result)

            output["response"] = result["response"]

        return output


if __name__ == "__main__":
    sentence = ""
    ir = IntentRecognizer()
    print(ir.intents)
    while sentence != "quit":
        sentence = input("Enter something: ")
        print(ir.run(sentence))
    print("Bye")