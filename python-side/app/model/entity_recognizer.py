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

    # def append_db_data(self):
    #     entity_list = list(utils.load_json(os.path.join(root, "data", "entities.json"))["entities"])
    #     data_genre = []
    #     data_movie = []
    #     entity_key = []
    #     idx = len(entity_list) - 1
    #
    #     for entity in entity_list:
    #         entity_key.append(entity["key"])
    #
    #     genres = Genres()
    #     result = list(genres.find_all())
    #     data_genre.extend(
    #         [{"org_val": genre["genre_name"], "description": genre["genre_description"]}
    #          for genre in result])
    #     if "movie_genres" in entity_key:
    #         idx = entity_key.index("movie_genres")
    #         entity_list.pop(idx)
    #     else:
    #         entity_key.insert(idx, "movie_genres")
    #     entity_list.append({"key": "movie_genres", "values": data_genre})
    #
    #     movies = Movies()
    #     result = list(movies.find_all())
    #     data_movie.extend(
    #         [{"org_val": movie["movie_title"], "description": movie["movie_description"]}
    #          for movie in result])
    #     if "movie_title" in entity_key:
    #         idx = entity_key.index("movie_title")
    #         entity_list.pop(idx)
    #     else:
    #         entity_key.insert(idx, "movie_title")
    #     entity_list.append({"key": "movie_title", "values": data_movie})
    #
    #     print(entity_key)
    #
    #     utils.save_json({"entities": entity_list}, os.path.join(root, "data", "entities.json"), True)

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
        data_movie.extend(
            [{"org_val": movie["movie_title"], "description": movie["movie_description"]}
             for movie in result])

        row = next((item for item in entity_list if item["key"] == "movie_title"), None)

        if row is None:
            entity_list.append({"key": "movie_title", "values": data_movie})
        else:
            idx = entity_list.index(row)
            entity_list.pop(idx)
            entity_list.insert(idx, {"key": "movie_title", "values": data_movie})

        utils.save_json({"entities": entity_list}, os.path.join(root, "data", "entities.json"), True)


if __name__ == "__main__":
    er = EntityRecognizer()
    # r = er.detect_entities("tôi muốn xem phim kinh dị")
    # print(r)
    # er.load_entity()
    # er.append_db_data()
