import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import utils.utils as utils
import utils.nlp_utils as nlp
ENTITY_THRESHOLD = 0.8
import re

SYNONYM_WORD = [["and", "và"], ["or", "hoặc"]]

class EntityRecognizer:
    def __init__(self):
        self.entity_list = []
        self.entity_vals = []
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


if __name__ == "__main__":
    er = EntityRecognizer()
    r = er.detect_entities("tôi muốn xem phim kinh dị")
    print(r)
