import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import utils.utils as utils
import utils.nlp_utils as nlp
MIN_SCORE = 0.8

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

        # print(self.entity_vals)
        # print(self.entity_list)

    def detect_entities(self, sentence):
        # entities = []
        # sen_result= {}
        # for i in range(len(self.entity_vals)):
        #     print(self.entity_vals[i], sentence)
        #     result = nlp.approximate_search(self.entity_vals[i], sentence)
        #     if result["score"] > MIN_SCORE:
        #         sentence = sentence.replace(result["matched"], self.entity_list[i]["key"])
        #         entities.append(self.entity_list[i])
        #         sen_result ={"sen_result": sentence, "entitites": entities}
        # print(sen_result)
        # return sen_result

        entities = []
        for i in range(len(self.entity_vals)):
            if self.entity_vals[i] in sentence:
                sentence = sentence.replace(self.entity_vals[i], self.entity_list[i]["key"])
                entities.append(self.entity_list[i])
        result = {"sen_result": sentence, "entitites": entities}
        return result


if __name__ == "__main__":
    er = EntityRecognizer()
    r = er.detect_entities("có ma")
    print(r)