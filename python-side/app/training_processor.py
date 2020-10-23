import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

import utils.utils as utils
import utils.nlp_utils as nlp

from app.pre_processor import PreProcessor

class TrainingProcessor:
    def create_data_training(self):
        pre_processor = PreProcessor()
        data_training = utils.read_json(os.path.join(root, "data", "intent_training.json"))["intents"]
        print(data_training)
        # for data in data_training:
        #     training = []
        #     for phrase in data["training_phrases"]:
        #         training.append(pre_processor.run(phrase))
        #     data["training_phrases"] = training
        # utils.save_json({"intents": },os.path.join(root, "data", "intent_training_origin.json") )

if __name__ == "__main__":
    training_processor = TrainingProcessor()
    training_processor.create_data_training()
        
