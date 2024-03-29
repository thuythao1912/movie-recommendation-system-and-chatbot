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

from app.model.item_recognizer import EntityRecognizer, AgreeRecognizer
from app.model.sentiment_recognizer import SentimentRecognizer
from app.model.train import Train
from app.model.db_connector import *
from app.model.suggestor import Suggestor, SuggestBasedUser

INTENT_THRESHOLD = float(config["INTENT"]["INTENT_THRESHOLD"])

UNKNOWN_RESPONSE = 'Xin lỗi, bạn có thể cung cấp thêm thông tin không?'
MISSING_RESPONSE = 'Xin lỗi, hiện mình chưa có thông tin về "{}". Mình sẽ cập nhật sớm nhất có thể!'
POS_RESPONSE = "Hihi, cảm ơn bạn nha ^^"
NEG_RESPONSE = "Xin lỗi bạn, vì mình còn nhỏ, nên chưa đủ thông tin hữu ích cho bạn :("
ENTITIES = ["movie_genres", "movie_title"]
MEANINGLESS_WORDS = ["ừm", "ừ", "ok", "okay", "okie", "yeah", "oki", "ờ", "ùm"]


class IntentRecognizer:
    def __init__(self):
        print("====> INIT INTENT RECOGNIZER")
        self.clf = None
        self.load_model()
        self.intents = None
        self.load_intents()
        self.entity_recognizer = EntityRecognizer()
        self.agree_recognizer = AgreeRecognizer()
        self.sentiment_recognizer = SentimentRecognizer()

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
        result = {}
        intent = next((item for item in self.intents if item["intent_name"] == intent_name), None)
        description = ""
        response = UNKNOWN_RESPONSE
        condition = {}
        if not intent is None:
            description = intent["description"]
            if intent["description"] != "query":
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
                        ent_vals = [{e["key"]: {"$regex": e["org_val"], "$options": "i"}} for e in entities if
                                    e["key"] == entity]
                        if len(opt) > 0:
                            condition = {f'${opt[0]}': ent_vals}
                        else:
                            condition = ent_vals[0]
                        response = intent["query"].format(condition)

                        if "query#" in response:
                            response = self.query_answer(response)
        result["condition"] = condition
        result["response"] = response
        result["description"] = description
        return result

    def query_answer(self, query):
        query = query.split("#")
        res = "Xin lỗi, hiện mình không tìm được phim như bạn mong muốn rồi!"

        if len(query) > 0:
            model = query[1]
            condition = eval(query[2])  # eval convert string to object
            obj = Movies()
            if model == "movies":
                results = obj.find_one(condition)
                if not results is None:
                    movie_des = ", ".join(results["movie_description"]) if (results[
                        "movie_description"]) is not None else ""
                    res = f"Thông tin phim bạn cần tìm là:\n " \
                          f"+Tựa phim: {results['movie_title']}\n " \
                          f"+Năm sản xuất: {results['movie_year']}\n " \
                          f"+Thể loại: {', '.join(results['movie_genres'])}\n" \
                          f"+Diễn viên: {results['movie_actors']}\n " \
                          f"+Đạo diễn: {results['movie_producers']}\n " \
                          f"+Tên khác: {movie_des}\n "

            elif model == "genres":
                results = list(obj.find_all(condition, limit=5))
                if len(results) > 0:
                    movies = ", ".join([movie["movie_title"] for movie in results])
                    res = "Các phim thuộc thể loại bạn đang tìm kiếm là: {}".format(movies)
        return res

    def run(self, sentence, user_id):
        print("====RUN===")
        sentence = nlp.preprocess_step_1(sentence)
        sen_result = self.entity_recognizer.detect_entities(sentence)
        sen_recognize = sen_result["sen_result"]
        sen_recognize = nlp.preprocess_step_2(sen_recognize)

        sign = sen_result["sign"]
        entities = sen_result["entitites"]
        entities_val = []
        data_predict = [{"feature": sen_recognize}]
        df_predict = pd.DataFrame(data_predict)

        print("==> Sentence to recognize: {}".format(sen_recognize))

        # check meaningless
        split_input = sentence.split(" ")
        for w in split_input:
            if w in MEANINGLESS_WORDS:
                output = {"input": sentence, "intent_name": "meaningless",
                          "response": "Nếu bạn cần hỗ trợ thì nhắn mình nhé!", "score": 1.0,
                          "entities": [], "condition": "{}", "description": "", "status": "handled",
                          }
                return output

        # predict
        intent_predicted = self.clf.predict(df_predict["feature"])
        print("Intent general predicted: {}".format(intent_predicted))

        # Get response
        score = max(self.clf.predict_proba(df_predict["feature"])[0])

        output = {"input": sentence, "intent_name": "", "response": "", "score": score, "entities": entities,
                  "condition": "", "description": "", "status": "unhandled", "sentiment_score": 0}
        if score < INTENT_THRESHOLD:
            sentiment_score = self.sentiment_recognizer.run(sen_recognize)
            if sentiment_score > 0:
                response = POS_RESPONSE
                intent_name = "positive_sentence"
                output["sentiment_score"] = sentiment_score
                output["status"] = "handled"
            elif sentiment_score < 0:
                response = NEG_RESPONSE
                intent_name = "negative_sentence"
                output["sentiment_score"] = sentiment_score
                output["status"] = "handled"
            else:
                response = UNKNOWN_RESPONSE
                intent_name = intent_predicted[0]
            output["response"] = response
            output["intent_name"] = intent_name
        else:
            name_predicted = intent_predicted[0]
            output["intent_name"] = name_predicted
            # # replace entity key by its values
            # for entity in entities:
            #     name_predicted = name_predicted.replace(entity["key"], entity["org_val"])
            #     name_predicted = nlp.remove_accents(name_predicted)
            #     entities_val.append(entity["org_val"])
            result = self.get_response(intent_predicted[0], entities, sign)
            print(result)

            if user_id is not None:
                # check if user has rating history
                history_rating = Ratings().find_all(filter={"user_id": int(user_id)})
                print(f"===> history rating of user {user_id}:", len(history_rating))

                if result["description"] == "suggest" and len(history_rating) > 0:
                    suggest_based_user = SuggestBasedUser().suggest_movies(user_id)
                    result[
                        "response"] = "Dựa vào các phim bạn đã đánh giá, mình nghĩ đây là những phim phù hợp với bạn: " + ", ".join(
                        suggest_based_user)
                    result["description"] = "res_suggest"

            output["response"] = result["response"]
            output["condition"] = str(result["condition"])
            output["description"] = result["description"]
            output["status"] = "handled"

        return output

    def run_with_history(self, sentence):
        print("===RUN WITH HISTORY===")
        sen_result = self.entity_recognizer.detect_entities(sentence)
        sen_recognize = sen_result["sen_result"]
        sen_recognize = nlp.preprocess_step_2(nlp.preprocess_step_1(sen_recognize))
        entities_val = []
        entities = sen_result["entitites"]

        for entity in entities:
            entities_val.append(entity["org_val"])

        print("==> Sentence to recognize: {}".format(sen_recognize))
        if len(entities_val) > 0:
            movies_suggest = Suggestor().suggest_movies(entities_val)
            response = "Dựa vào các phim bạn đã xem, mình nghĩ đây là những bộ phim phù hợp với bạn: {}".format(
                "; ".join(movies_suggest))
        else:
            response = "Tên phim bạn cung cấp không có trong danh sách nên mình không gợi ý được rồi!"

        output = {"input": sentence, "intent_name": "suggest_movie", "response": response, "score": 1.0,
                  "entities": entities,
                  "condition": "{}", "description": 'res_suggest', "status": "handled", "sentiment_score": 0}

        return output


if __name__ == "__main__":
    # sentence = ""
    ir = IntentRecognizer()
    # print(ir.intents)
    # while sentence != "quit":
    #     sentence = input("Enter something: ")
    #     print(ir.run(sentence))
    # print("Bye")

    ir.run_with_history("tôi không có muốn gợi ý")
