import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import utils.utils as utils
import utils.nlp_utils as nlp

ENTITY_THRESHOLD = 0.8
import re

from app.model.db_connector import *

SYNONYM_WORD = [["and", "và"], ["or", "hoặc"]]
YES_AGREE = ["có", "có chứ"]
NO_AGREE = ["không", "không có"]


class EntityRecognizer:
    def __init__(self):
        self.entity_list = []
        self.entity_key = []
        self.entity_vals = []
        self.append_db_data()
        self.load_entity()

    def load_entity(self):
        entity_list = utils.load_json(os.path.join(root, "data", "entities.json"))["entities"]
        data = []
        for entity in entity_list:
            for value in entity["values"]:
                data.append(
                    ({"key": entity["key"].lower(), "org_val": value["org_val"].lower(),
                      "value": value["org_val"].lower()}))
                if value["description"] is not None:
                    for i in range(len(value["description"])):
                        data.append(
                            ({"key": entity["key"].lower(), "org_val": value["org_val"].lower(),
                              "value": value["description"][i].lower()}))

            self.entity_key.append(entity["key"])

        for item in data:
            self.entity_vals.append(item["value"])
        self.entity_vals.sort(key=len, reverse=True)

        for entity_val in self.entity_vals:
            self.entity_list.append((next(item for item in data if item["value"] == entity_val)))

    def detect_entities(self, sentence):
        entities = []
        for i in range(len(self.entity_vals)):
            result = nlp.approximate_search(self.entity_vals[i], sentence)
            if result["score"] > ENTITY_THRESHOLD:
                sentence = sentence.replace(result["matched"], self.entity_list[i]["key"])
                print(sentence)
                entities.append(self.entity_list[i])
        res = [sub['key'] for sub in entities]
        entities_unique = list(set().union(res))
        sign = []
        for ent in entities_unique:
            if res.count(ent) > 1:
                sign.append({"entity": ent, "value": self.detect_sign(sentence, ent)})
        sen_result = {"sen_result": sentence, "entitites": entities, "sign": sign}
        return sen_result

    def detect_sign(self, sentence, entity):
        start = (sentence.find(entity))
        end = (sentence.rfind(entity))
        count_and = 0
        for i in SYNONYM_WORD[0]:
            count_and += sentence.count(i, start, end + 1)
        if count_and > 0:
            return "and"
        else:
            return "or"

    def append_db_data(self):
        entity_list = list(utils.load_json(os.path.join(root, "data", "entities.json"))["entities"])
        data_genre = []
        data_movie = []

        # Add genres
        result = list(Genres().find_all())
        data_genre.extend(
            [{"org_val": genre["genre_name"], "description": genre["genre_description"]}
             for genre in result])

        row = next((item for item in entity_list if item["key"] == "movie_genres"), None)

        if row is None:
            entity_list.append({"key": "movie_genres", "values": data_genre})
        else:
            idx = entity_list.index(row)
            entity_list.pop(idx)
            entity_list.insert(idx, {"key": "movie_genres", "values": data_genre})

        # Add movies
        result = list(Movies().find_all())
        data_movie.extend([{"org_val": movie["movie_title"], "description": movie["movie_description"]}
                           for movie in result])

        row = next((item for item in entity_list if item["key"] == "movie_title"), None)

        if row is None:
            entity_list.append({"key": "movie_title", "values": data_movie})
        else:
            idx = entity_list.index(row)
            entity_list.pop(idx)
            entity_list.insert(idx, {"key": "movie_title", "values": data_movie})

        utils.save_json({"entities": entity_list}, os.path.join(root, "data", "entities.json"), True)


class AgreeRecognizer:
    def __init__(self):
        self.agree_list = []
        self.agree_vals = []
        self.load_data()

    def load_data(self):
        self.agree_vals.extend(YES_AGREE)
        self.agree_list.extend([{"key": "YES_AGREE", "value": x} for x in YES_AGREE])
        self.agree_vals.extend(NO_AGREE)
        self.agree_list.extend([{"key": "NO_AGREE", "value": x} for x in NO_AGREE])
        self.agree_vals.sort(key=len, reverse=True)

    def detect_agree(self, sentence):
        count = [0, 0]  # count = [no, yes]
        for word in self.agree_vals:
            if word in sentence:
                agree = next(item for item in self.agree_list if item["value"] == word)
                sentence = sentence.replace(word, agree["key"])
                if agree["key"] == "YES_AGREE":
                    count[1] += 1
                if agree["key"] == "NO_AGREE":
                    count[0] += 1
        return {"sen_result": sentence, "count": max(count)}


if __name__ == "__main__":
    er = EntityRecognizer()
    ar = AgreeRecoginzer()
    # print(ar.detect_agree("tôi không có không có đâu"))
    # r = er.detect_entities("tôi muốn xem phim kinh dị")
    # print(r)
    # er.load_entity()
    # er.append_db_data()
