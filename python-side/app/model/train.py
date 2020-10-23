import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import utils.utils as utils
import utils.nlp_utils as nlp

import pandas as pd
from app.model.svm_model import SVMModel
from joblib import dump

class TextClassificationPredict(object):
    def __init__(self):
        pass

    def load_train_data(self, train_data_path):
        train_data = utils.load_json(train_data_path)
        return train_data

    def run(self, train_data_path):
        train_data_source = self.load_train_data(train_data_path)["intents"]
        # #  train data
        train_data = []
        for data in train_data_source:
            for phrase in data["training_phrases"]:
                train_data.append({"feature": f'{nlp.preprocess_step_1(phrase)}', "target": nlp.preprocess_step_1(data["intent_name"])})
        print(train_data)
        df_train = pd.DataFrame(train_data)

        # init model naive bayes
        model = SVMModel()

        # train/fit model
        clf = model.clf.fit(df_train["feature"], df_train.target)

        # save model to file
        dump(clf, 'model_predicted.joblib')
        print("===> Train model successfully")

    def predict(self):
        #  test data
        test_data = []
        test_data.append({"feature": u"Chào"})
        test_data.append({"feature": u"Tạm biệt"})
        test_data.append({"feature": u"tôi muốn tra cứu phim abc"})
        test_data.append({"feature": u"abc"})
        df_test = pd.DataFrame(test_data)
        print(df_test["feature"])

        # # predict
        # clf = load('model_predicted.joblib')
        # predicted = clf.predict(df_test["feature"])


        # # Print predicted result
        # print(predicted)
        # # ti le ti le class chao hoi -  class hoi ten- class thoi tiet
        # print(clf.predict_proba(df_test["feature"]))

        # for i in range(len(predicted)):
        #     result = {"predict_intent": predicted[i], "score": max(clf.predict_proba(df_test["feature"])[i])}
        #     print(result)
        #     res = next(item for item in self.train_data_source if item["intent_name"] == predicted[i])
        #     if result["score"] >0.5:
        #         print(f'Q: {df_test["feature"][i]} --- A: {random.choice(res["responses"])}')
        #     else:
        #         print(f'Q: {df_test["feature"][i]} --- A: Xin lỗi')


if __name__ == '__main__':
    tcp = TextClassificationPredict()
    tcp.run(os.path.join(root, "data", "intent_training.json"))
    # tcp.predict()