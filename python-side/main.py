import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

import utils.utils as utils
import utils.nlp_utils as nlp

import pandas as pd
from app.model.model_type import SVMModel

class TextClassificationPredict(object):
    def __init__(self):
        self.test = None

    def get_train_data(self):
        #  train data
        train_data = []
        train_data.append({"feature": u"Hôm nay trời đẹp không ?", "target": "hoi_thoi_tiet"})
        train_data.append({"feature": u"Hôm nay thời tiết thế nào ?", "target": "hoi_thoi_tiet"})
        train_data.append({"feature": u"Hôm nay mưa không ?", "target": "hoi_thoi_tiet"})
        train_data.append({"feature": u"Chào em gái", "target": "chao_hoi"})
        train_data.append({"feature": u"Chào bạn", "target": "chao_hoi"})
        train_data.append({"feature": u"Hello bạn", "target": "chao_hoi"})
        train_data.append({"feature": u"Hi kimi", "target": "chao_hoi"})
        train_data.append({"feature": u"Hi em", "target": "chao_hoi"})
        train_data.append({"feature": u"Bạn tên gì", "target": "hoi_ten"})
        train_data.append({"feature": u"Tên bạn như thế nào", "target": "hoi_ten"})
        df_train = pd.DataFrame(train_data)

        #  test data
        test_data = []
        test_data.append({"feature": u"Hôm nay thời tiết thế nào"})
        test_data.append({"feature": u"thời tiết thế nào"})
        test_data.append({"feature": u"Hi em"})
        test_data.append({"feature": u"Chào"})
        test_data.append({"feature": u"Tên gì vậy"})
        test_data.append({"feature": u"Cho hỏi bạn tên gì"})
        df_test = pd.DataFrame(test_data)

        # init model naive bayes
        model = SVMModel()

        clf = model.clf.fit(df_train["feature"], df_train.target)

        predicted = clf.predict(df_test["feature"])

        # Print predicted result
        print (predicted)
        #ti le ti le class chao hoi -  class hoi ten- class thoi tiet
        print (clf.predict_proba(df_test["feature"]))


if __name__ == '__main__':
    tcp = TextClassificationPredict()
    tcp.get_train_data()