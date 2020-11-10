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

import pymongo

class DBConnector:
    def __init__(self):
        self.client = pymongo.MongoClient("mongodb://localhost:27017/")
        self.db = self.client[config["DB"]["DB_NAME"]]

class Collection:
    connection = DBConnector()
    def __init__(self, collection_name):
        self.collection = self.connection.db[collection_name]

    def find_one(self, filter=None):
        return self.collection.find_one(filter=filter)

    def find_all(self, filter=None):
        return self.collection.find(filter=filter)

class Movies(Collection):
    def __init__(self):
        Collection.__init__(self,"movies")

class Genres(Collection):
    def __init__(self):
        Collection.__init__(self,"genres")


if __name__ == "__main__":
    movie = Movies()
    print(movie.find_one())
