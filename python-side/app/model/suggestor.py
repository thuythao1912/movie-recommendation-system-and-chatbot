
import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import configparser
config = configparser.ConfigParser()
config.read(os.path.join(root, 'config.ini'))

# from sklearn import cross_validation as cv
import numpy as np
import pandas as pd
from app.model.db_connector import *
from app.model.item_recognizer import EntityRecognizer

import utils.nlp_utils as nlp
import utils.utils as utils


MAX_SUGGEST_BY_MOVIE = 7
MAX_SUGGEST = 5


class Suggestor:
    obj_movies = Movies()
    obj_genres = Genres()

    def __init__(self):
        self.data_movies = self.obj_movies.find_all()
        self.data_genres = self.obj_genres.find_all()
        self.data_titles = [x["movie_title"] for x in self.data_movies]
        self.genres_name = [x["genre_name"] for x in self.data_genres]
        self.movies_vec = [self.create_movie_vec(x) for x in self.data_movies]

    def create_movie_vec(self, movie):
        movie_vec = []
        for genre in self.genres_name:
            if genre in movie["movie_genres"]:
                movie_vec.append(1)
            else:
                movie_vec.append(0)
        return movie_vec

    def get_movies_similarity(self, movie_idx):
        results = []
        for i in range(len(self.movies_vec)):
            if i == movie_idx:
                results.append(0.0)
            else:
                results.append(nlp.calculate_cosin_similarity(
                    self.movies_vec[movie_idx], self.movies_vec[i]))

        results = np.array(results)
        results = results.argsort()[::-1][:MAX_SUGGEST_BY_MOVIE]
        return list(results)

    def suggest_movies(self, arr_movie_title):
        suggest_movies_idx = []
        arr_idx = []
        for movie in arr_movie_title:
            idx = -1
            for m in self.data_titles:
                if movie.lower() in m:
                    idx = self.data_titles.index(m)
                    arr_idx.append(idx)
            suggest_movies_idx.extend(self.get_movies_similarity(idx))

        suggest_movies_idx = list(set().union(suggest_movies_idx))

        for idx in arr_idx:
            suggest_movies_idx.remove(idx)
        suggest_movies_idx = suggest_movies_idx[:MAX_SUGGEST]

        suggest_movies_titles = [x["movie_title"] for x in self.data_movies if
                                 self.data_movies.index(x) in suggest_movies_idx]
        return suggest_movies_titles


class SuggestBasedUser:
    def __init__(self):
        pass

    def run(self):
        data = utils.load_csv(os.path.join(
            root, "data", "raw_data", "ratings.csv"))

        # train_data, test_data = cv.train_test_split(small_data, test_size=0.2)
        #
        # # Create two user-item matrices for training and testing data
        # train_data_matrix = train_data.as_matrix(columns=['user_id', 'movie_id', 'rating'])
        # test_data_matrix = test_data.as_matrix(columns=['user_id', 'movie_id', 'rating'])

if __name__ == "__main__":
    # suggestor = Suggestor()
    # print(suggestor.suggest_movies(["jumanji", "toy story"]))

    sbu = SuggestBasedUser()
    sbu.run()